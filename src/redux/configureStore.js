import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import lineStyle from "./reducers/lineStyle";
import selectedElement from "./reducers/selectedElement";
import selectedSidebarTool from "./reducers/selectedSidebarTool";
import shareKey from "./reducers/shareKey";
import sidebarModeOption from "./reducers/sidebarModeOption";
import theme from "./reducers/theme";

import urlAddress from "./reducers/urlAddress";

const store = configureStore({
  reducer: {
    urlAddress: urlAddress,
    selectedSidebarTool: selectedSidebarTool,
    sidebarModeOption: sidebarModeOption,
    lineStyle: lineStyle,
    theme: theme,
    shareKey: shareKey,
    selectedElement: selectedElement,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
