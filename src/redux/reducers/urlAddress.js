import { createSlice } from "@reduxjs/toolkit";

export const urlAddress = createSlice({
  name: "urlAddress",
  initialState: {
    urlAddress: "https://illuminating-extol-innovation.w3spaces.com/",
  },
  reducers: {
    setUrlAddress(state, action) {
      state.urlAddress = action.payload;
    },
  },
});

export const { setUrlAddress } = urlAddress.actions;

export default urlAddress.reducer;
