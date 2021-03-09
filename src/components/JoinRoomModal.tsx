import React, { VFC, useState, useRef } from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useRoom } from "../hooks/useRoom";
import { Room } from "../types";

type JoinRoomModalProps = {
  room: Room;
  onClose: () => void;
};

export const JoinRoomModal: VFC<JoinRoomModalProps> = ({ room, onClose }) => {
  const [playerName, setPlayerName] = useState("");
  const initialFocusRef = useRef(null);
  const { push } = useHistory();
  const { joinRoom } = useRoom();

  const handleSubmit = () => {
    joinRoom(room.id, playerName);
    push(`/${room.id}/room`);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>ルームに入室する</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">
          <Text>ルーム名 : {room.name}</Text>
          <FormControl mt="4">
            <FormLabel>プレイヤー名</FormLabel>
            <Input
              type="name"
              placeholder="あなたのプレイヤー名を入力"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button disabled={playerName === ""} onClick={handleSubmit}>
            入室
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
