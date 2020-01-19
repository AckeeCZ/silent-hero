import React from "react";
import "./App.css";
import { MainLayout } from "./components/Layout";

import { useReducer } from "react";
import { reducer, initialState } from "./state";
import { LoginButton } from "./components/LoginButton";
import { WordCloud } from "./components/WordCloud";
import { NewKudo } from "./components/NewKudo";
import { KudosList } from "./components/KudosList";
import { UserWidget } from "./components/UserWidget";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contents = state.user ? (
    <div>
      <WordCloud
        users={state.users || []}
      />
      <NewKudo dispatch={dispatch} user={state.user} users={state.users || []} />
      <KudosList kudos={state.user?.kudos || []} user={state.user} users={state.users || []} />
    </div>
  ) : (<LoginButton dispatch={dispatch} user={state.user} />);
  return (
    <MainLayout>
      <div className="header"><h1>Silent hero.</h1></div>
      <UserWidget user={state.user} dispatch={dispatch} />
      {contents}
      <div>
        Ackee ©2020 Created by silent-hero team
      </div>
    </MainLayout>
  );
};

export default App;
