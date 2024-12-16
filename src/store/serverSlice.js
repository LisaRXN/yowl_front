import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "http://localhost:3000/"
};


const serverSlice = createSlice({
    name: "server",
    initialState,

    reducers: {
        setServer: (state, action) => {
          state.value = action.payload;
        },
      },
  
  });
  
export const { setServer } = serverSlice.actions;

export default serverSlice.reducer;
