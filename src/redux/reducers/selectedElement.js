import { createSlice } from "@reduxjs/toolkit";

export const selectedElement = createSlice({
  name: "selectedElement",
  initialState: {
    selectedElement: "",
  },
  reducers: {
    setSelectedElement(state, action) {
      state.selectedElement = action.payload;
    },
  },
});

export const { setSelectedElement } = selectedElement.actions;

export default selectedElement.reducer;
