import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebase, db } from "../lib/firebase";
import { Room, Player } from "../types";

export const useValueCard = () => {
  const [gameState, setGameState] = useState<Room>({
    id: "",
    name: "",
    owner: "",
    deck: [],
    graveyards: [],
    players: [],
  });
  const [players, setPlayers] = useState<Player[]>([]);

  const { roomId } = useParams<{ roomId: string }>();
  const { currentUser } = firebase.auth();

  const roomsRef = db.collection("/rooms");

  useEffect(() => {
    const unsubscribe = () => {
      roomsRef.doc(roomId).onSnapshot((doc) => {
        setGameState({
          ...(doc.data() as Room),
          id: doc.id,
        });
      });

      db.collection(`/rooms/${roomId}/players`).onSnapshot((docs) => {
        const _players: Player[] = [];
        docs.forEach((doc) => {
          _players.push(doc.data() as Player);
        });
        setPlayers(_players);
      });
    };
    unsubscribe();

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  const handleDraw = () => {
    if (!currentUser) return;
    roomsRef
      .doc(roomId)
      .get()
      .then((doc) => {
        const card = doc?.data()?.deck.slice(0, 1);
        roomsRef.doc(roomId).update({
          deck: firebase.firestore.FieldValue.arrayRemove(...card),
        });
        db.collection(`/rooms/${roomId}/players`)
          .doc(currentUser.uid)
          .update({
            hand: firebase.firestore.FieldValue.arrayUnion(...card),
          });
      });
  };
  const handleDiscard = (card: string) => {
    if (!currentUser) return;
    roomsRef.doc(roomId).update({
      graveyards: firebase.firestore.FieldValue.arrayUnion(card),
    });
    db.collection(`/rooms/${roomId}/players`)
      .doc(currentUser.uid)
      .update({
        hand: firebase.firestore.FieldValue.arrayRemove(card),
      });
  };

  const me = players.find((player) => player.uid === currentUser?.uid);

  return {
    gameState,
    players,
    me,
    handleDraw,
    handleDiscard,
  };
};
