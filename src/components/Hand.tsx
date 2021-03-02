import React, { VFC, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

export const Hand: VFC = () => {
  // const [];
  return (
    <Flex
      h="12rem"
      w="8rem"
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      boxShadow="base"
      borderWidth={1}
    >
      <Text fontSize="sm">リーダーシップ</Text>
    </Flex>
  );
};
