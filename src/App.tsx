import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Card } from "./components/Card";
import { Deck } from "./components/Deck";

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Box textAlign="center" fontSize="xl">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Card />
        <Deck />
      </Box>
    </RecoilRoot>
  </ChakraProvider>
);
