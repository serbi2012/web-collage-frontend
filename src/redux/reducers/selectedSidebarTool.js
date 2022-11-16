import { createSlice } from "@reduxjs/toolkit";

export const selectedSidebarTool = createSlice({
  name: "selectedSidebarTool",
  initialState: {
    selectedSidebarTool: null,
  },
  reducers: {
    selectSidebarTool(state, action) {
      state.selectedSidebarTool = action.payload;
    },
  },
});

export const { selectSidebarTool } = selectedSidebarTool.actions;

export default selectedSidebarTool.reducer;
