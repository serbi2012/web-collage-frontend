import { createSlice } from "@reduxjs/toolkit";

export const sidebarModeOption = createSlice({
  name: "sidebarModeOption",
  initialState: {
    sidebarModeOption: "BoxAndBlockMode",
  },
  reducers: {
    changeSidebarModeOption(state, action) {
      state.sidebarModeOption = action.payload;
    },
  },
});

export const { changeSidebarModeOption } = sidebarModeOption.actions;

export default sidebarModeOption.reducer;
