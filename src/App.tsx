import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Game } from "./components/Game";

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Box textAlign="center" fontSize="xl">
        <Game />
      </Box>
    </RecoilRoot>
  </ChakraProvider>
);
