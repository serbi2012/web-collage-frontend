import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blocks from "./reducers/blocks";
import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
    blocks: blocks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
