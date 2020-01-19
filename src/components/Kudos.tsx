import React, { useCallback } from "react";
import { Button } from "antd";
import { Connected, Kudo, User } from "../state";
import { formatRelative } from "date-fns";

interface Props {
  kudos: Kudo;
  from?: User;
  to: User;
}

export class Kudos extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const kudos = this.props.kudos;
    if (!kudos) return null;
    return (
      <div className="postit">
        <div>{kudos.message}</div>
        <div>from:{this.props.from?.displayName || 'anonymous'}</div>
        <div>to:{this.props.to?.displayName}</div>
        <div>{formatRelative(new Date(kudos.createdAt), new Date())}</div>
      </div>
    );
  }
}
