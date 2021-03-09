import React from "react";
import { Center, Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { CreateRoomModal } from "./CreateRoomModal";
import { JoinRoomModal } from "./JoinRoomModal";
import { useModal } from "../hooks/useModal";
import { useRoom } from "../hooks/useRoom";

export const Home = () => {
  const { openModal, closeModal } = useModal();
  const { rooms } = useRoom();

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
            <React.Fragment key={index}>
              {room.players.length !== 4 && (
                <ListItem mb="4" key={index}>
                  <Button
                    variant="outline"
                    onClick={() =>
                      openModal(JoinRoomModal, { room, onClose: closeModal })
                    }
                  >
                    {`${room.name} ${room.players.length}/4`}
                  </Button>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Center>
  );
};
