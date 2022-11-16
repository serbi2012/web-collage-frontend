import { createSlice } from "@reduxjs/toolkit";

export const selectModeOption = createSlice({
  name: "selectModeOption",
  initialState: {
    selectModeOption: "BoxAndBlockMode",
  },
  reducers: {
    changeSelectModeOption(state, action) {
      state.selectModeOption = action.payload;
    },
  },
});

export const { changeSelectModeOption } = selectModeOption.actions;

export default selectModeOption.reducer;
