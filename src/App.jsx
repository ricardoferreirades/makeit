import React from "react";
import "./App.css";
import { GlobalStyles } from "./global.styles";
import Pages from "./Pages/Home";

export const App = () => (
  <>
    <Pages />
    <GlobalStyles />
  </>
);
