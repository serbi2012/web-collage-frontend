import { createSlice } from "@reduxjs/toolkit";

export const shareKey = createSlice({
  name: "shareKey",
  initialState: {
    shareKey: "",
  },
  reducers: {
    setShareKey(state, action) {
      state.shareKey = action.payload;
    },
  },
});

export const { setShareKey } = shareKey.actions;

export default shareKey.reducer;
