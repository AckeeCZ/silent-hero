import React from "react";
import "./App.css";
import { MainLayout } from "./components/Layout";

import { WordCloud } from "./components/WordCloud";
import { NewKudo } from "./components/NewKudo";
import { KudosList } from "./components/KudosList";
import { State } from "./state/State";
import { Typography, Divider, Container } from "@material-ui/core";
import { Welcome } from "./components/Welcome";

const App: React.FC = () => {
  let { loggedUser, users } = State.useContainer()
  const contents = loggedUser ? (
    <div>
      <WordCloud
        users={users}
      />
      <NewKudo />
      <KudosList />
    </div>
  ) : (<Welcome />);
  return (
    <MainLayout>
      {contents}
      <Container maxWidth="md" className="footer">
        <Typography variant="overline" display="block" gutterBottom>
          <Divider light />
          Ackee ©2020 Created by heroes for heroes
      </Typography>
      </Container>
    </MainLayout>
  );
};

export default App;
