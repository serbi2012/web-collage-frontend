import { createSlice } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState: {
    theme: "theme-light",
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = theme.actions;

export default theme.reducer;
