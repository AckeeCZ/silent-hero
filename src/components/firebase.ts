

import firebase from "firebase";
const config = {
  apiKey: "AIzaSyA1rsMEnqaf84EtDRmtmXnllbKk86Yrg2I",
  authDomain: "silent-guardians.firebaseapp.com",
  databaseURL: "https://silent-guardians.firebaseio.com",
  projectId: "silent-guardians",
  storageBucket: "silent-guardians.appspot.com",
  messagingSenderId: "502114527008",
  appId: "1:502114527008:web:897e82e462894dc6d3d945",
  measurementId: "G-XKBB565EFS"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
