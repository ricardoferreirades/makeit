import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { GlobalStyles } from "./global.styles";
import Category from "./Components/Category/Category";
import Pages from "./Pages/Pages";

export const App = () => (
  <BrowserRouter>
    <Category />
    <Pages />
    <GlobalStyles />
  </BrowserRouter>
);
