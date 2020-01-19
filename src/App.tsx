import React from "react";
import "./App.css";
import { MainLayout } from "./components/Layout";

import { useReducer } from "react";
import { reducer, initialState } from "./state";
import { Login } from "./components/Login";
import { WordCloud } from "./components/WordCloud";
import { NewKudo } from "./components/NewKudo";
import { Layout } from "antd";
import { KudosList } from "./components/KudosList";

const { Footer } = Layout;

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainLayout>
      <Login dispatch={dispatch} state={state} />
        <WordCloud
          users={state.users || []}
        />
        <NewKudo dispatch={dispatch} user={state.user} users={state.users || []} />
        <KudosList  kudos={state.user?.kudos || []} user={state.user} users={state.users || []} />
        <Footer style={{ textAlign: "center" }}>
          Ackee ©2020 Created by silent-hero team
        </Footer>
    </MainLayout>
  );
};

export default App;
