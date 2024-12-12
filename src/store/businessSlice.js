import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const businessSlice = createSlice({
  name: "business",

  initialState,

  reducers: {
    setBusiness: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBusiness } = businessSlice.actions;

export default businessSlice.reducer;
