import { createSlice } from "@reduxjs/toolkit";

export const lineStyle = createSlice({
  name: "lineStyle",
  initialState: {
    lineColor: "black",
    lineWidth: 3,
    lineOpacity: 20,
  },
  reducers: {
    setLineColor(state, action) {
      state.lineColor = action.payload;
    },
    setLineWidth(state, action) {
      state.lineWidth = action.payload;
    },
    setLineOpacity(state, action) {
      state.lineOpacity = action.payload;
    },
  },
});

export const { setLineColor, setLineWidth, setLineOpacity } = lineStyle.actions;

export default lineStyle.reducer;
