import React, { VFC } from "react";
import { Flex, Text } from "@chakra-ui/react";

type CardProps = {
  value?: string | number;
  onClick?: () => void;
  isHorizontal?: boolean;
};

export const Card: VFC<CardProps> = ({ value, onClick, isHorizontal }) => {
  const h = isHorizontal ? "4rem" : value ? "8rem" : "6rem";
  const w = isHorizontal ? "6rem" : value ? "6rem" : "4rem";

  return (
    <Flex
      h={h}
      w={w}
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      boxShadow="base"
      borderWidth={1}
      bg={value && typeof value === "string" ? undefined : "green.100"}
      onClick={onClick}
    >
      {value && (
        <Text fontSize="sm" textAlign="center">
          {value}
        </Text>
      )}
    </Flex>
  );
};
