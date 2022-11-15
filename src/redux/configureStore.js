import { configureStore } from "@reduxjs/toolkit";
import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
  },
});

export default store;
