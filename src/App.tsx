import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Home } from "./components/Home";
import { ModalManager } from "./components/ModalManager";
import { Room } from "./components/Room";
import "./lib/firebase";

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/:roomId/room">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <ModalManager />
      </Router>
    </RecoilRoot>
  </ChakraProvider>
);
