import React, { useState } from "react";
import { Dispatcher, User } from "../state";
import { FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, TextField, Button, DialogContent, DialogTitle, Dialog, DialogActions } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import { maxKudosPerPeriod } from "../config/config";
import { addKudo } from "../services/firestoreService";

interface Props extends Dispatcher {
  user?: User;
  users: User[];
}

export const NewKudo = ({ user, dispatch, users }: Props) => {
  const [opened, setOpened] = useState(false);
  const close = () => setOpened(false);
  const [message, setMessage] = useState('');
  const [receiverUid, setReceiverUid] = useState('');
  const [senderAgreesWithPublish, setSenderAgreesWithPublish] = useState(false);
  const [senderAnonymous, setSenderAnonymous] = useState(true);

  const handleOk = async () => {
    if (!user) throw new Error('Must have user to create kudos');
    const kudoData = {
      message: message,
      receiverUid: receiverUid,
      senderAgreesWithPublish: senderAgreesWithPublish,
      senderAnonymous: senderAnonymous
    };
    const kudo = await addKudo(
      // TODO
      kudoData as any,
      user,
    );
    dispatch({ type: "createdKudo", kudo });
    close();
  };

  if (!user) return null;
  return (
    <div>
      {user && (
        <Button variant="contained" color="primary" onClick={() => setOpened(true)} startIcon={<SendOutlined />}>
          Send Kudos ({user.kudosSentThisPeriod}/{maxKudosPerPeriod})
        </Button>
      )}
      <Dialog open={opened} onClose={close}>
        <DialogTitle id="form-dialog-title">Give Kudos</DialogTitle>
        <DialogContent className="kudo-from">
          <FormControl>
            <InputLabel>Your hero</InputLabel>
            <Select onChange={e => setReceiverUid(String(e.target.value))}>
              {users.map(u => <MenuItem value={u.uid}>{`${u.displayName} (${u.email})`}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            label="Message"
            multiline
            rowsMax="4"
            onChange={e => setMessage(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox onChange={e => setSenderAgreesWithPublish(e.target.checked)} value="jason" />}
            label="Agree to publish"
          />
          <FormControlLabel
            control={<Checkbox onChange={e => setSenderAnonymous(!e.target.checked)} value="jason" />}
            label="Agree to display my name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Give Kudos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
