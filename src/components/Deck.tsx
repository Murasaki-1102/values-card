import React, { VFC, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { randomShuffle } from "../utils/card";
import { useCards } from "../hooks/useCards";

export const Deck: VFC = () => {
  const { cards } = useCards();
  console.log("🚀 ~ file: Deck.tsx ~ line 7 ~ cards", randomShuffle(cards));

  return (
    <Flex
      h="12rem"
      w="8rem"
      bg="green.100"
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      boxShadow="base"
      borderWidth={1}
      onClick={() => console.log("hgoe`s")}
    >
      <Text fontSize="sm">{cards.length}</Text>
    </Flex>
  );
};
