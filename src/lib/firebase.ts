import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const createRoom = (roomName: string, ownerName: string) => {
  const id = firebase.firestore().collection("_").doc().id;
  firebase.firestore().collection("rooms").doc(id).set({
    name: roomName,
    owner: ownerName,
    players: [],
  });
  return id;
};

const joinRoom = (roomId: string, name: string) => {
  firebase
    .auth()
    .signInAnonymously()
    .then((credential) => {
      firebase
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .update({
          players: firebase.firestore.FieldValue.arrayUnion({
            uid: credential.user?.uid,
            name,
            hand: [],
          }),
        });
      firebase
        .firestore()
        .collection(`rooms/${roomId}/players`)
        .doc(credential.user?.uid)
        .set({
          uid: credential.user?.uid,
          name,
          hand: [],
        });
    });
};

export { firebase, createRoom, joinRoom };
