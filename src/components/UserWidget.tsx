import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import { State } from "../state/State";

export const UserWidget = () => {
  let { loggedUser: user, logout } = State.useContainer()
  if (!user) return null;
  return (
    <div className="user-widget">
      <IconButton onClick={logout}>
        <ExitToAppOutlined fontSize="inherit" />
      </IconButton>
      <Avatar alt={user?.displayName} src={user?.avatar} />
    </div>
  );
}
