import React, { useState } from "react";
import { Kudo, User } from "../state";
import { Kudos } from "./Kudos";
import { isEmpty } from "ramda";
import { Tabs, Tab } from "@material-ui/core";

interface Props {
  users: User[];
  kudos: Kudo[];
  user?: User;
}

export const KudosList = ({ user, kudos, users }: Props) => {
    const [activeTab, setActiveTab] = useState<'sent'|'received'>('sent');
    if (!user || isEmpty(kudos)) return null;
    const toCard = (showSender: boolean) => (k: Kudo) => {
      const from =
        (!k.senderAnonymous && users.find(u => u.uid === k.senderUid)) ||
        undefined;
      const to = users.find(u => u.uid === k.receiverUid);
      if (!to) return null;
      return <Kudos showSender={showSender} kudos={k} to={to} from={from} />;
    };
    const sent = user.kudos.filter(k => k.senderUid === user.uid).map(toCard(false));
    const received = user.kudos
      .filter(k => k.receiverUid === user.uid)
      .map(toCard(true));
    return (
      <div>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, val) => setActiveTab(val)}
          aria-label="disabled tabs example"
        >
          <Tab label="Sent" value={'sent'}  />
          <Tab label="Received" value={'received'} />
        </Tabs>
        
        { activeTab === 'sent' && received}
        { activeTab === 'received' && sent}
      </div>
    );
}
