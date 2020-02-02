import React from "react";
import { Button } from "@material-ui/core";
import { State } from "../state/State";

export const LoginButton = () => {
  const { login } = State.useContainer()
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={login}
    >
      Login
    </Button>
  )
}
