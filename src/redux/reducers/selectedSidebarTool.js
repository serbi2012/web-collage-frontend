import { createSlice } from "@reduxjs/toolkit";

export const selectedSidebarTool = createSlice({
  name: "selectedSidebarTool",
  initialState: {
    selectedSidebarTool: "null",
    isSidebarModalOpen: false,
  },
  reducers: {
    selectSidebarTool(state, action) {
      state.selectedSidebarTool = action.payload;
    },
    toggleModalOpen(state, action) {
      state.isSidebarModalOpen = action.payload;
    },
  },
});

export const { selectSidebarTool, toggleModalOpen } =
  selectedSidebarTool.actions;

export default selectedSidebarTool.reducer;
