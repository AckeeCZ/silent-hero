import React from "react";
import { Button } from "@material-ui/core";
import { State } from "../state/State";

export const UserWidget = () => {
  let { loggedUser: user, logout, login } = State.useContainer()
  const button = user ? <Button color="inherit" onClick={logout}>logout</Button> : <Button color="inherit" onClick={login}>login</Button>;
  return button;
}
