import React, { VFC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { useModal } from "../hooks/useModal";
import { firebase } from "../lib/firebase";
import { WaitingModal } from "./WaitingModal";
import { Game } from "./Game";

export const Room: VFC = () => {
  const [players, setPlayers] = useState([]);

  const { openModal, closeModal } = useModal();
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = firebase
      .firestore()
      .collection(`/rooms/${roomId}/players`)
      .onSnapshot((snapshot) => {
        const _players: any = [];
        snapshot.forEach((doc) => {
          _players.push(doc.data());
        });
        setPlayers(_players);
        if (snapshot.size !== 4) {
          openModal(WaitingModal, { onClose: closeModal, players: _players });
        } else {
          closeModal();
        }
      });

    return unsubscribe;
  }, []);

  return <Center minH="100vh">{players.length === 2 && <Game />}</Center>;
};
