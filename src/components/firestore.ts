import firebase from "./firebase";
import { Kudo, User } from "../state";


export const kudoCollection = firebase
  .firestore()
  .collection("kudos") as firebase.firestore.CollectionReference<Kudo>;

export const userCollection = firebase
  .firestore()
  .collection("users") as firebase.firestore.CollectionReference<User>;

export const maxKudosPerPeriod = 3;