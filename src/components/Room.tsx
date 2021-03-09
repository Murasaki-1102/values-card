import React, { VFC, useEffect } from "react";
import { Box, Flex, Text, Center, Spinner } from "@chakra-ui/react";
import { useModal } from "../hooks/useModal";
import { WaitingModal } from "./WaitingModal";
import { useValueCard } from "../hooks/useValueCard";
import { Card } from "./Card";
import { getFrontOrder, getNextOrder, getPrevOrder } from "../utils";

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

  const leftPlayer = players.find(
    (player) => player.order === getNextOrder(me?.order!)
  );
  const rightPlayer = players.find(
    (player) => player.order === getPrevOrder(me?.order!)
  );

  const frontPlayer = players.find(
    (player) => player.order === getFrontOrder(me?.order!)
  );

  const currentPlayer = players.find((player) => player.isCurrentPlayer);

  const navigationText =
    gameState.deck.length === 0
      ? "ゲーム終了！"
      : `次は${currentPlayer?.name}の番です`;

  if (gameState.players.length !== 4) return null;

  return (
    <Box
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex justifyContent="center">
        {frontPlayer?.hand.map((card, index) => (
          <Card key={index} value={card} isOpen={gameState.deck.length === 0} />
        ))}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          {leftPlayer?.hand?.map((card, index) => (
            <Card
              key={index}
              value={card}
              isHorizontal
              isOpen={gameState.deck.length === 0}
            />
          ))}
        </Box>

        <Box>
          {navigationText ? (
            <Text textAlign="center" fontSize="2xl">
              {navigationText}
            </Text>
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}

          <Flex
            mt="2"
            w="32rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Text textAlign="center">山札</Text>
              <Card
                isOpen
                value={gameState?.deck?.length}
                onClick={() => {
                  if (!me?.isCurrentPlayer) return;
                  if (hand?.length! >= 6) return;
                  handleDraw();
                }}
              />
            </Box>

            <Box>
              <Text textAlign="center">捨てたカード</Text>
              <Flex
                w="20rem"
                h="22rem"
                wrap="wrap"
                alignContent="flex-start"
                pl="1rem"
                py="1rem"
                overflowY="scroll"
                borderWidth={1}
              >
                {[...gameState.graveyards].reverse().map((graveyard, index) => (
                  <Card key={index} value={graveyard} isOpen />
                ))}
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box>
          {rightPlayer?.hand.map((card, index) => (
            <Card
              key={index}
              value={card}
              isHorizontal
              isOpen={gameState.deck.length === 0}
            />
          ))}
        </Box>
      </Flex>

      <Flex justifyContent="center">
        {hand?.map((card, index) => (
          <Card
            key={index}
            value={card}
            isOpen
            onClick={() => {
              if (!me?.isCurrentPlayer) return;
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
