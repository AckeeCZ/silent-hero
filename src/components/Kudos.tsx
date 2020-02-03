import React from "react";
import { formatRelative } from "date-fns";
import { Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Typography } from "@material-ui/core";
import { HelpOutlineOutlined, ShareOutlined } from "@material-ui/icons";
import { Kudo, User, State } from "../state/State";

interface Props {
  kudos: Kudo;
  from?: User;
  to?: User;
  view: 'sender' | 'receiver' | 'bare'; // show sender or receiver on card
}

export const Kudos = ({ kudos, to, from, view }: Props) => {
  if (!kudos) return null;
  const { editKudos } = State.useContainer()
  const actor = view === 'receiver' ? from : to;
  const shareDisabled = view === 'receiver' ? !kudos.senderAgreesWithPublish : !kudos.receiverAgreesWithPublish;
  const shareActive = !shareDisabled && view === 'receiver' ? kudos.receiverAgreesWithPublish : kudos.senderAgreesWithPublish;
  return (
    <Card className="kudos-card">
      {view !== 'bare' && <CardHeader
        avatar={
          <Avatar src={actor?.avatar}><HelpOutlineOutlined /></Avatar>
        }
        title={actor?.displayName || 'Anonymous'}
        subheader={formatRelative(new Date(kudos.createdAt), new Date())}
      />}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {kudos.message}
        </Typography>
      </CardContent>
      {view === 'receiver' && <CardActions disableSpacing>
        <IconButton disabled={shareDisabled} onClick={() => editKudos(kudos.id, { receiverAgreesWithPublish: !kudos.receiverAgreesWithPublish})}>
          <ShareOutlined color={shareActive ? 'secondary' : undefined} />
        </IconButton>
      </CardActions>}
    </Card>
  );
}
