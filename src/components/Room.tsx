import React, { VFC, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { useModal } from "../hooks/useModal";
import { WaitingModal } from "./WaitingModal";
import { useValueCard } from "../hooks/useValueCard";
import { Card } from "./Card";
import { getFrontOrder, getNextOrder, getPrevOrder } from "../utils";
import { useHistory } from "react-router-dom";

export const Room: VFC = () => {
  const {
    gameState,
    players,
    me,
    handleDraw,
    handleInitialDraw,
    handleDiscard,
    checkExistsRoom,
  } = useValueCard();

  const { openModal, closeModal } = useModal();
  const { push } = useHistory();
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

  useEffect(() => {
    (async () => {
      const isExistsRoom = await checkExistsRoom();
      if (!isExistsRoom) {
        closeModal();
        push("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (players.length !== 4) {
      openModal(WaitingModal, {
        onClose: closeModal,
        players,
      });
    } else {
      closeModal();
    }
    // eslint-disable-next-line
  }, [players]);

  useEffect(() => {
    if (me?.hand.length === 0) handleInitialDraw();
    // eslint-disable-next-line
  }, [me?.hand]);

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

  const isFinish = gameState?.deck?.length === 0;

  const navigationText = isFinish
    ? "ゲーム終了！"
    : `次は${currentPlayer?.name}の番です`;

  if (players?.length !== 4) return null;

  return (
    <Box
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      p={isLargerThan400 ? undefined : "4"}
    >
      {isLargerThan400 && (
        <Flex justifyContent="center">
          {frontPlayer?.hand.map((card, index) => (
            <Card key={index} value={card} isOpen={isFinish} />
          ))}
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="center">
        {isLargerThan400 && (
          <Box>
            {leftPlayer?.hand?.map((card, index) => (
              <Card key={index} value={card} isHorizontal isOpen={isFinish} />
            ))}
          </Box>
        )}

        <Box pt={isLargerThan400 ? undefined : "12"}>
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
            w={isLargerThan400 ? "42rem" : undefined}
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
                w={isLargerThan400 ? "20rem" : "14rem"}
                h={isLargerThan400 ? "22rem" : "32rem"}
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

        {isLargerThan400 && (
          <Box>
            {rightPlayer?.hand.map((card, index) => (
              <Card key={index} value={card} isHorizontal isOpen={isFinish} />
            ))}
          </Box>
        )}
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
