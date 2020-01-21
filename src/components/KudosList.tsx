import React, { useState } from "react";
import { Kudo, User } from "../state";
import { Kudos } from "./Kudos";
import { isEmpty } from "ramda";
import { Tabs, Tab, Paper } from "@material-ui/core";

interface Props {
  users: User[];
  kudos: Kudo[];
  user?: User;
}

export const KudosList = ({ user, kudos, users }: Props) => {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
  if (!user || isEmpty(kudos)) return null;
  const toCard = (view: 'sender' | 'receiver') => (k: Kudo) => {
    const from =
      (!k.senderAnonymous && users.find(u => u.uid === k.senderUid)) ||
      undefined;
    const to = users.find(u => u.uid === k.receiverUid);
    if (!to) return null;
    return <Kudos view={view} kudos={k} to={to} from={from} />;
  };
  const sent = user.kudos.filter(k => k.senderUid === user.uid).map(toCard('sender'));
  const received = user.kudos
    .filter(k => k.receiverUid === user.uid)
    .map(toCard('receiver'));
  return (
    <div>
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
    </div>
  );
}
