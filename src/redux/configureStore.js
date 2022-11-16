import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blocks from "./reducers/blocks";
import selectedSidebarTool from "./reducers/selectedSidebarTool";
import selectModeOption from "./reducers/selectModeOption";
import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
    blocks: blocks,
    selectedSidebarTool: selectedSidebarTool,
    selectModeOption: selectModeOption,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
