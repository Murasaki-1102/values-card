import React, { VFC } from "react";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { Player, Room } from "../types";

type WaitingModalProps = {
  onClose: () => void;
  players: Player[];
  gameState: Room;
};

export const WaitingModal: VFC<WaitingModalProps> = ({
  onClose,
  players,
  gameState,
}) => (
  <Modal isOpen={true} onClose={onClose} isCentered closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody py="6" textAlign="center">
        <Flex justifyContent="center">
          <Text fontSize="xl">{`部屋名: ${gameState.name}`}</Text>
          <Text fontSize="xl" ml="2">{`作成者: ${gameState.owner}`}</Text>
        </Flex>
        <Text mt="2">プレイヤーが4人揃うのを待っています...</Text>
        <Text mt="2">{`${players.length}/4`}</Text>
        <Spinner
          mt="6"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </ModalBody>
      {/* <ModalFooter justifyContent="flex-start">
        <Button size="sm">前の画面に戻る</Button>
      </ModalFooter> */}
    </ModalContent>
  </Modal>
);
