import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../../redux/configureStore";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ScrapWindow from "../../components/ScrapWindow";
import WebWindow from "../../components/WebWindow";
import "./index.css";

const MainContainer = styled.div`
  display: flex;
`;

const Main = () => {
  return (
    <Provider store={store}>
      <MainContainer>
        <Sidebar />
        <ScrapWindow />
        <WebWindow />
      </MainContainer>
    </Provider>
  );
};

render(<Main />, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
