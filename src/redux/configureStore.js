import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blocks from "./reducers/blocks";
import lineStyle from "./reducers/lineStyle";
import selectedSidebarTool from "./reducers/selectedSidebarTool";
import sidebarModeOption from "./reducers/sidebarModeOption";
import theme from "./reducers/theme";

import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
    blocks: blocks,
    selectedSidebarTool: selectedSidebarTool,
    sidebarModeOption: sidebarModeOption,
    lineStyle: lineStyle,
    theme: theme,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
