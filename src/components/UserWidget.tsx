import React from "react";
import { User, Dispatcher } from "../state";
import { Avatar, IconButton } from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";

interface Props extends Dispatcher {
  user?: User;
}

export const UserWidget = ({ user, dispatch }: Props) => {
  if (!user) return null;
  return (
    <div className="user-widget">
      <IconButton onClick={() =>
        dispatch({
          type: "logout"
        })
      }>
        <ExitToAppOutlined fontSize="inherit" />
      </IconButton>
      <Avatar alt={user?.displayName} src={user?.avatar} />
    </div>
  );
}
