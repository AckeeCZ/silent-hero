import React, { useState } from "react";
import { Button, DialogContent, DialogTitle, Dialog, DialogActions } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import { Select } from 'material-ui-formik-components/Select'
import { TextField } from 'material-ui-formik-components/TextField'
import { Switch } from 'material-ui-formik-components/Switch'
import { maxKudosPerPeriod } from "../config/config";
import { State } from "../state/State";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export const NewKudo = () => {
  const [opened, setOpened] = useState(false);
  let { loggedUser: user, users, createKudos } = State.useContainer()
  const close = () => setOpened(false);

  if (!user) return null;
  return (
    <div>
      <Button size="large" disabled={user.kudosSentThisPeriod >= maxKudosPerPeriod} variant="contained" color="primary" onClick={() => setOpened(true)} startIcon={<SendOutlined />}>
        Send Kudos ({user.kudosSentThisPeriod}/{maxKudosPerPeriod})
        </Button>
      <Dialog open={opened} onClose={close}>
        <Formik initialValues={{
          receiverUid: '',
          message: '',
          senderAgreesWithPublish: false,
          senderAnonymous: false,
        }}
          validationSchema={
            Yup.object().shape({
              receiverUid: Yup.string()
                .notOneOf([user.uid], 'Rude to kudos oneself')
                .required(),
              message: Yup.string()
                .min(1)
                .required(),
            })
          }
          onSubmit={async values => {
            await createKudos(values);
            close();
          }}>
          <Form>
            <DialogTitle id="form-dialog-title">Send Kudos</DialogTitle>
            <DialogContent className="kudo-from">
              <Field
                required
                name="receiverUid"
                label="Your hero"
                options={users.map(u => ({ value: u.uid, label: `${u.displayName} (${u.email})` }))}
                component={Select}
              />
              <Field
                required
                name="message"
                label="Message"
                component={TextField}
              />
              <Field
                required
                name="senderAgreesWithPublish"
                label="I agree to publish (sender & receiver must both agree to display publicly)"
                component={Switch}
              />
              <Field
                required
                name="senderAnonymous"
                label="I want to remain anonymous"
                component={Switch}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
