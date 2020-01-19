import React from "react";
import { User } from "../state";
const C3Cloud = require('react-d3-cloud')

interface CloudProps {
    users: User[]
}
interface Word {
  text?: string;
  value: number;
}
const fontSizeMapper = (word: Word) => word.value;
const rotate = () => ~~(Math.random() * 2) * 90;

export class WordCloud extends React.Component<CloudProps, {}> {
    
    constructor(props: CloudProps) {
      super(props);
      this.state = {};
    }

    render() {

      const max = this.props.users.reduce((acc, u) => Math.max(u.kudosReceivedThisPeriod, acc), 0)
      const data: Word[] = this.props.users.map(u => ({
        text: u.displayName,
        value: u.kudosReceivedThisPeriod/max * 70
      }))

        const onClick = (word: Word) => {
          console.log(word)
        }

        const onWordMouseOver = (word: Word) => {
          console.log("over")
        }

        const onWordMouseOut = (word: Word) => {
          console.log("out")
        }

        return (
          <C3Cloud data={data} font="Bebas Neue" fontSizeMapper={fontSizeMapper} rotate={rotate} padding={1} onWordClick={onClick} onWordMouseOver={onWordMouseOver} onWordMouseOut={onWordMouseOut} />
        )
    }

}