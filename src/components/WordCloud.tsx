import React, { useState } from "react";
import { User, Kudo } from "../state";
import { Kudos } from "./Kudos";
const C3Cloud = require('react-d3-cloud')

interface CloudProps {
  users: User[]
}
interface Word {
  text?: string;
  value: { user: User, size: number };
}

const fontSizeMapper = (word: Word) => word.value.size;
const rotate = () => ~~(Math.random() * 2) * 90;

// Prevent randomizing render via memoization
const getCloud = (() => {
  let cloud: any = undefined;
  return (props: { data: any, onClick: any }) => {
    if (cloud) return cloud;
    cloud = <C3Cloud data={props.data} font="Bebas Neue" fontSizeMapper={fontSizeMapper} rotate={rotate} padding={1} onWordClick={props.onClick} />
    return cloud;
  }
})()

export const WordCloud = ({ users }: CloudProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const max = users.reduce((acc, u) => Math.max(u.kudosReceivedThisPeriod, acc), 0)
  const data: Word[] = users.map(u => ({
    text: u.displayName,
    value: {
      user: u,
      size: u.kudosReceivedThisPeriod / max * 70,
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
      {user && <React.Fragment><h2>{user?.displayName}'s public kudos</h2>
        {user?.kudos.filter(k => k.receiverUid === k.receiverUid).map(toCard)}</React.Fragment>}

    </div>
  )
};
