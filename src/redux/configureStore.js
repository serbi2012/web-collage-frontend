import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blocks from "./reducers/blocks";
import selectedSidebarTool from "./reducers/selectedSidebarTool";
import sidebarModeOption from "./reducers/sidebarModeOption";

import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
    blocks: blocks,
    selectedSidebarTool: selectedSidebarTool,
    sidebarModeOption: sidebarModeOption,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
