import React, { useState, useEffect } from "react";
import { Center, Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { firebase } from "../lib/firebase";
import { CreateRoomModal } from "./CreateRoomModal";
import { JoinRoomModal } from "./JoinRoomModal";
import { useModal } from "../hooks/useModal";

export const Home = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = firebase
      .firestore()
      .collection("rooms")
      .onSnapshot((snapshot) => {
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

  return (
    <Center minH="100vh">
      <Box w="40rem" textAlign="center">
        <Button
          onClick={() => {
            openModal(CreateRoomModal, { onClose: closeModal });
          }}
        >
          ルームを作成する
        </Button>

        <Heading mt="16" fontSize="xl">
          ルーム一覧
        </Heading>

        <List mt="4" p="2" borderWidth={1} h="16rem" overflowY="scroll">
          {rooms.map((room, index) => (
            <ListItem mb="4" key={index}>
              <Button
                variant="outline"
                onClick={() =>
                  openModal(JoinRoomModal, { room, onClose: closeModal })
                }
              >
                {room.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Center>
  );
};
