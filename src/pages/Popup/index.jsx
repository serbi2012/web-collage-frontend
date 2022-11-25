import React from "react";
import { render } from "react-dom";

import Popup from "./Popup";
import "./index.css";
import store from "../../redux/configureStore";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  window.document.querySelector("#app-container")
);

if (module.hot) module.hot.accept();
