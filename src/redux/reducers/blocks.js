import { createSlice } from "@reduxjs/toolkit";

export const blocks = createSlice({
  name: "blocks",
  initialState: {
    blocks: [],
  },
  reducers: {
    addBlocks(state, action) {
      state.blocks.push(action.payload);
    },
  },
});

export const { addBlocks } = blocks.actions;

export default blocks.reducer;
