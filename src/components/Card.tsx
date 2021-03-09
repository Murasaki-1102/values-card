import React, { VFC } from "react";
import { Flex, Text } from "@chakra-ui/react";

type CardProps = {
  value: string | number;
  onClick?: () => void;
  isHorizontal?: boolean;
  isOpen?: boolean;
};

export const Card: VFC<CardProps> = ({
  value,
  onClick,
  isHorizontal,
  isOpen,
}) => {
  const getHeight = () => {
    if (isOpen && isHorizontal) return "6rem";
    if (isHorizontal) return "4rem";
    if (!isOpen) return "6rem";
    return "8rem";
  };
  const getWidth = () => {
    if (isOpen && isHorizontal) return "8rem";
    if (isHorizontal) return "6rem";
    if (!isOpen) return "4rem";
    return "6rem";
  };
  const h = getHeight();
  const w = getWidth();

  return (
    <Flex
      h={h}
      w={w}
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      boxShadow="base"
      borderWidth={1}
      bg={isOpen && typeof value === "string" ? undefined : "green.100"}
      onClick={onClick}
    >
      {isOpen && (
        <Text fontSize="sm" textAlign="center">
          {value}
        </Text>
      )}
    </Flex>
  );
};
