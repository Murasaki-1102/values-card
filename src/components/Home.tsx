import React, { useState, useEffect } from "react";
import {
  Center,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { firebase } from "../lib/firebase";
import { CreateRoomModal } from "./CreateRoomModal";

export const Home = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button onClick={onOpen}>ルームを作成する</Button>

        <Heading mt="16" fontSize="xl">
          ルーム一覧
        </Heading>

        <List mt="4" p="2" borderWidth={1} h="16rem" overflowY="scroll">
          {rooms.map((room, index) => (
            <ListItem mb="4" key={index}>
              <Button variant="outline">{room.name}</Button>
            </ListItem>
          ))}
        </List>
      </Box>

      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </Center>
  );
};
