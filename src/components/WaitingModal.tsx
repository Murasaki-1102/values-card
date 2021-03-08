import React, { VFC } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { Player } from "../types";

type WaitingModalProps = {
  onClose: () => void;
  players: Player[];
};

export const WaitingModal: VFC<WaitingModalProps> = ({ onClose, players }) => (
  <Modal isOpen={true} onClose={onClose} isCentered closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody py="6" textAlign="center">
        <Text>プレイヤーが4人揃うのを待っています...</Text>
        <Text>{`${players.length}/4`}</Text>
        <Spinner
          mt="4"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);
