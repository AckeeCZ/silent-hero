import React from "react";
import "./App.css";
import { MainLayout } from "./components/Layout";

import { LoginButton } from "./components/LoginButton";
import { WordCloud } from "./components/WordCloud";
import { NewKudo } from "./components/NewKudo";
import { KudosList } from "./components/KudosList";
import { UserWidget } from "./components/UserWidget";
import { State } from "./state/State";

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
  ) : (<LoginButton />);
  return (
    <MainLayout>
      <div className="header"><h1>Silent hero.</h1></div>
      <UserWidget />
      {contents}
      <div>
        Ackee ©2020 Created by silent-hero team
      </div>
    </MainLayout>
  );
};

export default App;
