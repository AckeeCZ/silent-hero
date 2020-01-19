import React from "react";
import { Kudo, User } from "../state";
import { formatRelative } from "date-fns";
import { Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Typography } from "@material-ui/core";
import { HelpOutlineOutlined, ShareOutlined } from "@material-ui/icons";

interface Props {
  kudos: Kudo;
  from?: User;
  to: User;
  showSender: boolean; // show sender or receiver on card
}

export const Kudos = ({ kudos, to, from, showSender }: Props) => {
  if (!kudos) return null;
  const actor = showSender ? from : to;
  return (
    <Card className="kudos-card">
      <CardHeader
        avatar={
          <Avatar src={actor?.avatar}><HelpOutlineOutlined /></Avatar>
        }
        title={actor?.displayName || 'Anonymous'}
        subheader={formatRelative(new Date(kudos.createdAt), new Date())}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {kudos.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
