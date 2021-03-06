import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Game } from "./components/Game";
import { Home } from "./components/Home";
import "./lib/firebase";

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/:roomId/room">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  </ChakraProvider>
);
