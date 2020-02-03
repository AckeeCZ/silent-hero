import { kudoCollection, UserSnapshot, KudoSnapshot } from "./firestoreService";
import { periodStart } from "./utilityServoce";
import { User, Kudo } from "../state/State";

export const addUserStats = async (user: User): Promise<User> => ({
  ...user,
  kudosSentThisPeriod: (await kudoCollection
    .where("senderUid", "==", user.uid)
    .where("createdAt", ">=", periodStart())
    .get()).size,
  kudosReceivedThisPeriod: (await kudoCollection
    .where("receiverUid", "==", user.uid)
    .where("createdAt", ">=", periodStart())
    .get()).size,
  kudosReceivedLastPeriod: (await kudoCollection
    .where("receiverUid", "==", user.uid)
    .where("createdAt", ">=", periodStart(-1))
    .get()).size,
})

export const addAllKudos = async (user: User): Promise<User> => ({
  ...user,
  kudos: [
    ...(await kudoCollection.where("receiverUid", "==", user.uid).get()).docs,
    ...(await kudoCollection.where("senderUid", "==", user.uid).get()).docs
  ].map(snapshotToKudo)
})

export const addRecentPublicKudos = async (user: User): Promise<User> => ({
  ...user,
  kudos: (await kudoCollection.where("receiverUid", "==", user.uid).where("createdAt", ">=", periodStart(-1)).get()).docs.map(snapshotToKudo)
})

export const snapshotToUser = async (d: firebase.firestore.QueryDocumentSnapshot<UserSnapshot>): Promise<User> => {
  const u = d.data();
  return addUserStats({
    ...u,
    kudosReceivedLastPeriod: 0,
    kudosReceivedThisPeriod: 0,
    kudosSentThisPeriod: 0,
    kudos: [],
  });
}

export const snapshotToKudo = (d: firebase.firestore.QueryDocumentSnapshot<KudoSnapshot> | firebase.firestore.DocumentSnapshot<KudoSnapshot>): Kudo => {
  const k = d.data()!;
  return { ...k, createdAt: k.createdAt.toDate() }
};
