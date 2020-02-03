import firebase, { googleProvider } from "./firebaseService";
import { Kudo, User } from "../state/State";
import { addUserStats, snapshotToUser, addAllKudos, addRecentPublicKudos, snapshotToKudo } from "./transformService";
import { generateId } from "./utilityServoce";
import { composeP } from "ramda";

export interface UserSnapshot {
  email?: string;
  avatar?: string;
  displayName?: string;
  uid: string;
}

export interface KudoSnapshot {
  id: string;
  createdAt: firebase.firestore.Timestamp;
  message: string;
  senderUid: string;
  receiverUid: string;
  senderAnonymous: boolean;
  senderAgreesWithPublish: boolean;
  receiverAgreesWithPublish: boolean;
}

export const kudoCollection = firebase
  .firestore()
  .collection("kudos") as firebase.firestore.CollectionReference<KudoSnapshot>;

export const userCollection = firebase
  .firestore()
  .collection("users") as firebase.firestore.CollectionReference<UserSnapshot>;


export const loginUser = async (): Promise<User> => {
  const { user: fbUser } = await firebase
    .auth()
    .signInWithPopup(googleProvider);
  if (!fbUser) throw new Error('Authentication failed');
  const { uid } = fbUser;
  const user: User = {
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

  return composeP(addUserStats, addAllKudos)(user);
}

export const getUsers = async () => Promise.all(
  (await userCollection.get()).docs.map(composeP(addRecentPublicKudos, snapshotToUser))
)

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
  await kudoCollection.doc(kudo.id).set(kudo as any);
  return kudo;
};

export const updateKudos = async (
  id: Kudo['id'],
  kudosData: Pick<Kudo, "senderAgreesWithPublish" | "receiverAgreesWithPublish">
) => {
  const doc = kudoCollection.doc(id);
  await doc.update(kudosData);
  return snapshotToKudo(await doc.get())
};