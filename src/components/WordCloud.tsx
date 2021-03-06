import React, { useState } from "react";
import { Kudos } from "./Kudos";
import { User, Kudo } from "../state/State";
import { Container } from "@material-ui/core";
const C3Cloud = require('react-d3-cloud')

interface Word {
  text?: string;
  value: { user: User, size: number };
}

const fontSizeMapper = (word: Word) => word.value.size;
const rotate = () => ~~(Math.random() * 2) * 90;

// Prevent randomizing render via memoization
const getCloud = (() => {
  let cloud: any = undefined;
  let lastLength = 0;
  return (props: { data: any, onClick: any }) => {
    if (cloud && lastLength === props.data.length) return cloud;
    cloud = <C3Cloud data={props.data} font="Bebas Neue" fontSizeMapper={fontSizeMapper} rotate={rotate} padding={1} onWordClick={props.onClick} />
    lastLength = props.data.length;
    return cloud;
  }
})()

export const WordCloud = ({ users }: { users: User[] }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const max = users.reduce((acc, u) => Math.max(u.kudosReceivedThisPeriod, acc), 0) + 1
  const data: Word[] = users.map(u => ({
    text: u.displayName,
    value: {
      user: u,
      size: (u.kudosReceivedThisPeriod || 1) / max * 70,
    }
  }))

  const onClick = (word: Word) => {
    setUser(word.value.user)
  }

  const toCard = (k: Kudo) => {
    return (<Kudos view="bare" kudos={k} />);
  }

  return (
    <div>
      {getCloud({ data, onClick })}
      {user && <Container maxWidth="md"><h2>{user?.displayName}'s public kudos</h2>
        {user?.kudos.filter(k => k.receiverUid === user.uid).filter(k => k.senderAgreesWithPublish && k.receiverAgreesWithPublish).map(toCard)}</Container>}

    </div>
  )
};
