import React from "react";
import { User, Dispatcher } from "../state";
import { getUsers, login } from "../services/firestoreService";
import { Button } from "@material-ui/core";

interface Props extends Dispatcher {
  user?: User;
}

export const LoginButton = ({ user, dispatch }: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        const user = await login();
        const users = await getUsers();
        dispatch({
          user,
          type: "login"
        });
        dispatch({
          users,
          type: "setUsers"
        });
      }}
    >
      Login
    </Button>
  )
}
