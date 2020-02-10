import React, { useState } from "react";
import { Kudos } from "./Kudos";
import { isEmpty } from "ramda";
import { Tabs, Tab, Container } from "@material-ui/core";
import { State, Kudo } from "../state/State";

export const KudosList = () => {
  let { loggedUser: user, users } = State.useContainer()
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');
  if (!user || isEmpty(user.kudos)) return null;
  const myUid = user.uid;
  const toCard = (view: 'sender' | 'receiver') => (k: Kudo) => {
    const from =
      (!k.senderAnonymous && users.find(u => u.uid === k.senderUid)) ||
      undefined;
    const to = users.find(u => u.uid === k.receiverUid);
    if (!to) return null;
    return <Kudos view={view} kudos={k} to={to} from={from} />;
  };
  const kudos = user.kudos.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  const sent = kudos.filter(k => k.senderUid === myUid).map(toCard('sender'));
  const received = kudos
    .filter(k => k.receiverUid === myUid)
    .map(toCard('receiver'));
  return (
    <Container maxWidth="md">
      <Tabs
        value={activeTab}
        centered
        indicatorColor="primary"
        onChange={(e, val) => setActiveTab(val)}
      >
        <Tab label="Received" value={'received'} />
        <Tab label="Sent" value={'sent'} />
      </Tabs>

      {activeTab === 'received' && received}
      {activeTab === 'sent' && sent}
    </Container>
  );
}
