import React from "react";
import { Kudo, User } from "../state";
import { formatRelative } from "date-fns";
import { Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Typography } from "@material-ui/core";
import { HelpOutlineOutlined, ShareOutlined } from "@material-ui/icons";

interface Props {
  kudos: Kudo;
  from?: User;
  to?: User;
  view: 'sender' | 'receiver' | 'bare'; // show sender or receiver on card
}

export const Kudos = ({ kudos, to, from, view }: Props) => {
  if (!kudos) return null;
  const actor = view === 'receiver' ? from : to;
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
      {view !== 'bare' && <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareOutlined />
        </IconButton>
      </CardActions>}
    </Card>
  );
}
