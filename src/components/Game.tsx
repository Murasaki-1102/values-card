import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useCards } from "../hooks/useCards";

export const Game = () => {
  const [hands, setHands] = useState([] as string[]);
  const [graveyards, setGraveyards] = useState([] as string[]);
  const { cards, initialDraw, drawCard } = useCards();

  const initialSetting = useCallback(() => {
    const initialCards = initialDraw();
    setHands([...initialCards]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initialSetting();
  }, [initialSetting]);

  return (
    <Box
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex justifyContent="center">
        {hands.map((card, index) => (
          <Flex
            key={index}
            h="6rem"
            w="4rem"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            boxShadow="base"
            borderWidth={1}
            onClick={() => {
              if (hands.length === 6) {
                setHands([...hands.filter((hand) => hand !== card)]);
                setGraveyards([
                  ...graveyards,
                  ...hands.filter((hand) => hand === card),
                ]);
              }
            }}
          >
            <Text fontSize="sm">{card}</Text>
          </Flex>
        ))}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          {hands.map((card, index) => (
            <Flex
              key={index}
              h="4rem"
              w="6rem"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              boxShadow="base"
              borderWidth={1}
              onClick={() => {
                if (hands.length === 6) {
                  setHands([...hands.filter((hand) => hand !== card)]);
                  setGraveyards([
                    ...graveyards,
                    ...hands.filter((hand) => hand === card),
                  ]);
                }
              }}
            >
              <Text fontSize="sm">{card}</Text>
            </Flex>
          ))}
        </Box>
        <Box>
          <Flex
            h="8rem"
            w="6rem"
            bg="green.100"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            boxShadow="base"
            borderWidth={1}
            onClick={() => {
              if (hands.length === 6) return;
              const card = drawCard();
              setHands([...hands, ...card]);
            }}
          >
            <Text fontSize="sm">{cards.length}</Text>
          </Flex>
          <Flex>
            {graveyards.map((graveyard) => (
              <Flex
                h="8rem"
                w="6rem"
                bg="green.100"
                justifyContent="center"
                alignItems="center"
                borderRadius="md"
                boxShadow="base"
                borderWidth={1}
                onClick={() => {
                  if (hands.length === 6) return;
                  const card = drawCard();
                  setHands([...hands, ...card]);
                }}
              >
                <Text fontSize="sm">{graveyard}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>
        <Box>
          {hands.map((card, index) => (
            <Flex
              key={index}
              h="4rem"
              w="6rem"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              boxShadow="base"
              borderWidth={1}
              onClick={() => {
                if (hands.length === 6) {
                  setHands([...hands.filter((hand) => hand !== card)]);
                  setGraveyards([
                    ...graveyards,
                    ...hands.filter((hand) => hand === card),
                  ]);
                }
              }}
            >
              <Text fontSize="sm">{card}</Text>
            </Flex>
          ))}
        </Box>
      </Flex>

      <Flex justifyContent="center">
        {hands.map((card, index) => (
          <Flex
            key={index}
            h="8rem"
            w="6rem"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            boxShadow="base"
            borderWidth={1}
            onClick={() => {
              if (hands.length === 6) {
                setHands([...hands.filter((hand) => hand !== card)]);
                setGraveyards([
                  ...graveyards,
                  ...hands.filter((hand) => hand === card),
                ]);
              }
            }}
          >
            <Text fontSize="sm">{card}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
