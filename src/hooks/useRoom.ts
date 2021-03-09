import { useState, useEffect } from "react";
import { valueCards } from "../config";
import { firebase, db } from "../lib/firebase";
import { Room } from "../types";
import { randomShuffle } from "../utils/index";

export const useRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = db.collection("/rooms").onSnapshot((snapshot) => {
      const _rooms: any[] = [];
      snapshot.forEach((doc) => {
        _rooms.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRooms(_rooms);
    });

    return unsubscribe;
  }, []);

  const roomsRef = db.collection("/rooms");

  const createRoom = (roomName: string, ownerName: string): string => {
    const id = firebase.firestore().collection("_").doc().id;
    firebase
      .auth()
      .signInAnonymously()
      .then(async (credential) => {
        await roomsRef.doc(id).set({
          name: roomName,
          owner: ownerName,
          playersLength: 1,
          deck: randomShuffle(valueCards),
          graveyards: [],
        });

        const collection = db.collection(`rooms/${id}/players`);

        collection.doc(credential.user?.uid).set({
          order: 1,
          uid: credential.user?.uid,
          name: ownerName,
          hand: [],
          isCurrentPlayer: true,
        });
      });

    return id;
  };

  const joinRoom = (roomId: string, name: string) => {
    firebase
      .auth()
      .signInAnonymously()
      .then(async (credential) => {
        const collection = db.collection(`rooms/${roomId}/players`);

        const beforeDocumentLength = await collection
          .get()
          .then((docs) => docs.size + 1);

        await collection.doc(credential.user?.uid).set({
          order: beforeDocumentLength,
          uid: credential.user?.uid,
          name,
          hand: [],
          isCurrentPlayer: false,
        });

        const afterDocumentLength = await collection
          .get()
          .then((docs) => docs.size + 1);

        if (beforeDocumentLength !== afterDocumentLength) {
          roomsRef.doc(roomId).update({
            playersLength: afterDocumentLength,
          });
        }
      });
  };

  return {
    rooms,
    createRoom,
    joinRoom,
  };
};
