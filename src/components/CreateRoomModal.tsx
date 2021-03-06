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
import { createRoom } from "../lib/firebase";

type CreateRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateRoomModal: VFC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const initialFocusRef = useRef(null);
  const { push } = useHistory();

  const handleSubmit = () => {
    const id = createRoom(roomName, playerName);
    push(`/${id}/room`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>ルームを作成する</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">
          <FormControl>
            <FormLabel>ルーム名</FormLabel>
            <Input
              ref={initialFocusRef}
              type="name"
              placeholder="ルーム名を入力"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </FormControl>

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
          <Button
            disabled={roomName === "" || playerName === ""}
            onClick={handleSubmit}
          >
            作成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
