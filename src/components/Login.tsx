import React from "react";
import { Button, Avatar } from "antd";
import { startOfMonth, addMonths } from "date-fns";
import firebase, { googleProvider } from "./firebase";
import { Connected, Kudo, User } from "../state";
import { userCollection, kudoCollection } from "./firestore";

interface Props extends Connected {}

const getData = <R, T extends { data: () => any }>(doc: T) => doc.data();

const periodStart = (delta = 0) => startOfMonth(addMonths(new Date(), delta));

const handleLogin = async () => {
  const { user: fbUser } = await firebase
    .auth()
    .signInWithPopup(googleProvider);
  if (!fbUser) return { user: undefined, users: [] };
  const { uid } = fbUser;
  let user: User = {
    uid,
    avatar: fbUser.photoURL || undefined,
    displayName: fbUser.displayName || undefined,
    email: fbUser.email || undefined,
    kudos: [],
    kudosReceivedLastPeriod: 0,
    kudosReceivedThisPeriod: 0,
    kudosSentThisPeriod: 0
  };

  await userCollection.doc(uid).set(user);

  user.kudos = [
    ...(await kudoCollection.where("receiverUid", "==", user.uid).get()).docs,
    ...(await kudoCollection.where("senderUid", "==", user.uid).get()).docs
  ].map(d => {
    const k = d.data();
    k.createdAt = new Date((k.createdAt as any).toDate());
    return k;
  });

  const users = await Promise.all(
    (await userCollection.get()).docs.map(async d => {
      const u = d.data();
      const additional = {
        kudosSentThisPeriod: (
          await kudoCollection
            .where("senderUid", "==", u.uid)
            .where("createdAt", ">=", periodStart())
            .get()
        ).size,
        kudosReceivedThisPeriod: (
          await kudoCollection
            .where("receiverUid", "==", u.uid)
            .where("createdAt", ">=", periodStart())
            .get()
        ).size,
        kudosReceivedLastPeriod: (
          await kudoCollection
            .where("receiverUid", "==", u.uid)
            .where("createdAt", ">=", periodStart(-1))
            .get()
        ).size
      };
      if (u.uid === user.uid) {
        user = { ...user, ...additional };
      }
      return { ...u, ...additional };
    })
  );
  return { user, users };
};

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const addKudo = async (
  kudoData: Omit<
    Kudo,
    "id" | "createdAt" | "senderUid" | "receiverAgreesWithPublish"
  >,
  sender: User
) => {
  const kudo = {
    ...kudoData,
    createdAt: new Date(),
    id: generateId(),
    senderUid: sender.uid,
    receiverAgreesWithPublish: false
  };
  await kudoCollection.doc(kudo.id).set(kudo);
  return kudo;
};

export class Login extends React.Component<Props, { hovered: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hovered: false };
  }
  render() {
    const user = this.props.state.user;
    if (user) {
      const attrs = this.state.hovered
        ? { icon: "logout" }
        : { src: user.avatar };
      return (
        <div className="login-container">
          <a
            onClick={() =>
              this.props.dispatch({
                type: "logout"
              })
            }
            onMouseEnter={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
          >
            <Avatar
              {...attrs}
              shape="square"
              size="large"
            />
          </a>
        </div>
      );
    }
    return (
      <div className="login-container">
        <a
          onClick={async () => {
            const { user, users } = (await handleLogin()) || {};
            this.props.dispatch({
              user,
              type: "login"
            });
            this.props.dispatch({
              users,
              type: "setUsers"
            });
          }}
        >
          <Avatar
            shape="square"
            size="large"
            icon="user"
          ></Avatar>
        </a>
      </div>
    );
  }
}
