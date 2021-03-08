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

type CreateRoomModalProps = {
  onClose: () => void;
};

export const CreateRoomModal: VFC<CreateRoomModalProps> = ({ onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const initialFocusRef = useRef(null);
  const { push } = useHistory();
  const { createRoom } = useRoom();

  const handleSubmit = () => {
    const id = createRoom(roomName, playerName);
    onClose();
    push(`/${id}/room`);
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
