import { createSlice } from "@reduxjs/toolkit";

export const urlAddress = createSlice({
  name: "urlAddress",
  initialState: {
    urlAddress: "https://eye-catch-danke-foresight.w3spaces.com",
  },
  reducers: {
    setUrlAddress(state, action) {
      state.urlAddress = action.payload;
    },
  },
});

export const { setUrlAddress } = urlAddress.actions;

export default urlAddress.reducer;
