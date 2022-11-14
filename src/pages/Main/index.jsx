import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Sidebar from "../../containers/Sidebar";
import ScrapWindow from "../../containers/ScrapWindow";
import WebWindow from "../../containers/WebWindow";
import "./index.css";

const MainContainer = styled.div`
  display: flex;
`;

const Main = () => {
  return (
    <MainContainer>
      <Sidebar />
      <ScrapWindow />
      <WebWindow />
    </MainContainer>
  );
};

render(<Main />, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
