import React, { useState, useEffect } from "react";
import { Center, Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { firebase, createRoom } from "../lib/firebase";

export const Home = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = firebase
      .firestore()
      .collection("rooms")
      .onSnapshot((snapshot) => {
        const _rooms: any[] = [];
        snapshot.forEach((doc) => {
          _rooms.push(doc.data());
        });
        setRooms(_rooms);
      });

    return unsubscribe;
  }, []);

  return (
    <Center minH="100vh">
      <Box w="40rem" textAlign="center">
        <Button
          as={Link}
          to="/game"
          onClick={() => createRoom("hoge", "purple")}
        >
          ルームを作成する
        </Button>

        <Heading mt="16" fontSize="xl">
          ルーム一覧
        </Heading>

        <List mt="4" borderWidth={1} h="16rem" overflowY="scroll">
          {rooms.map((room, index) => (
            <ListItem mb="4" key={index}>
              <Button variant="outline">{room.name}</Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Center>
  );
};
