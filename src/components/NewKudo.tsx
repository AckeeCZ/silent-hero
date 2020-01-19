import React from "react";
import { Button, Modal, AutoComplete, Checkbox } from "antd";
import { Connected, Kudo, Dispatcher, User } from "../state";
import TextArea from "antd/lib/input/TextArea";
import { addKudo } from "./Login";
import { maxKudosPerPeriod } from "./firestore";

interface Props extends Dispatcher {
  user?: User;
  users: User[];
}
interface State extends Partial<Kudo> {
  visible: boolean;
}

export class NewKudo extends React.Component<Props, State> {
  state: State = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    const { user } = this.props;
    if (!user) throw new Error('Must have user to create kudos');
    const kudoData = {
      message: this.state.message,
      receiverUid: this.state.receiverUid,
      senderAgreesWithPublish: !!this.state.senderAgreesWithPublish,
      senderAnonymous: !!this.state.senderAnonymous
    };
    const kudo = await addKudo(
      // TODO
      kudoData as any,
      user,
    );
    this.props.dispatch({ type: "createdKudo", kudo });
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {user, users} = this.props;
    if (!user) return null;
    return (
      <div>
        {this.props.user && (
          <Button type="primary" onClick={this.showModal}>
            Add Kudo ({user.kudosSentThisPeriod}/
            {maxKudosPerPeriod})
          </Button>
        )}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AutoComplete
            style={{ width: 200 }}
            dataSource={users.map(u => ({
              text: `${u.displayName} (${u.email})`,
              value: u.uid
            }))}
            placeholder="Start typing"
            onChange={e => this.setState({ receiverUid: e.toString() })}
          />
          <TextArea
            rows={4}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <Checkbox
            onChange={e => {
              this.setState({ senderAgreesWithPublish: e.target.checked });
              console.log(this.state);
            }}
          >
            Agree to publish
          </Checkbox>
          <Checkbox
            onChange={e =>
              this.setState({ senderAnonymous: !e.target.checked })
            }
          >
            Agree to display my name
          </Checkbox>
        </Modal>
      </div>
    );
  }
}
