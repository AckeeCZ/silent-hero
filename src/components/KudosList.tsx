import React from "react";
import { Button, Divider } from "antd";
import { Connected, Kudo, User } from "../state";
import { Kudos } from "./Kudos";
import { isEmpty } from "ramda";
import { Tabs } from "antd";

const { TabPane } = Tabs;

interface Props {
  users: User[];
  kudos: Kudo[];
  user?: User;
}

export class KudosList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { user, kudos, users } = this.props;
    if (!user || isEmpty(kudos)) return null;
    const toPostit = (k: Kudo) => {
      const from =
        (!k.senderAnonymous && users.find(u => u.uid === k.senderUid)) ||
        undefined;
      const to = users.find(u => u.uid === k.receiverUid);
      if (!to) return null;
      return <Kudos kudos={k} to={to} from={from} />;
    };
    const sent = user.kudos.filter(k => k.senderUid === user.uid).map(toPostit);
    const received = user.kudos
      .filter(k => k.receiverUid === user.uid)
      .map(toPostit);
    console.log(sent);
    return (
      <div>
        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Received" key="1">
            Content of Tab Pane 1{received}
          </TabPane>
          <TabPane tab="Sent" key="2">
            Content of Tab Pane 2{sent}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
