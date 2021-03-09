import React, { VFC, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useModal } from "../hooks/useModal";
import { WaitingModal } from "./WaitingModal";
import { useValueCard } from "../hooks/useValueCard";
import { Card } from "./Card";

export const Room: VFC = () => {
  const { gameState, players, me, handleDraw, handleDiscard } = useValueCard();

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (gameState.players.length !== 4) {
      openModal(WaitingModal, {
        onClose: closeModal,
        players: gameState.players,
      });
    } else {
      closeModal();
    }
    // eslint-disable-next-line
  }, [gameState]);

  const hand = me?.hand;

  const getNextOrder = (order: number): number => {
    if (order === 4) return 1;
    return order + 1;
  };

  const getPrevOrder = (order: number): number => {
    if (order === 1) return 4;
    return order - 1;
  };

  const getFrontOrder = (order: number): number => {
    if (order === 3) return 1;
    if (order === 4) return 2;
    return order + 2;
  };

  const leftPlayer = players.find(
    (player) => player.order === getNextOrder(me?.order!)
  );
  const rightPlayer = players.find(
    (player) => player.order === getPrevOrder(me?.order!)
  );

  const frontPlayer = players.find(
    (player) => player.order === getFrontOrder(me?.order!)
  );

  if (gameState.players.length !== 4) return null;

  return (
    <Box
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex justifyContent="center">
        {frontPlayer?.hand.map((_, index) => (
          <Card key={index} />
        ))}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          {leftPlayer?.hand?.map((_, index) => (
            <Card key={index} isHorizontal />
          ))}
        </Box>

        <Flex w="32rem" justifyContent="space-between" alignItems="center">
          <Card
            value={gameState?.deck?.length}
            onClick={() => {
              if (hand?.length! >= 6) return;
              handleDraw();
            }}
          />

          <Flex
            w="20rem"
            h="20rem"
            wrap="wrap"
            alignContent="flex-start"
            pl="1rem"
            overflowY="scroll"
            borderWidth={1}
          >
            {[...gameState.graveyards].reverse().map((graveyard, index) => (
              <Card key={index} value={graveyard} />
            ))}
          </Flex>
        </Flex>

        <Box>
          {rightPlayer?.hand.map((_, index) => (
            <Card key={index} isHorizontal />
          ))}
        </Box>
      </Flex>

      <Flex justifyContent="center">
        {hand?.map((card, index) => (
          <Card
            key={index}
            value={card}
            onClick={() => {
              if (hand?.length >= 6) {
                handleDiscard(card);
              }
            }}
          />
        ))}
      </Flex>
    </Box>
  );
};
