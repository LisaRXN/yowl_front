import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: "http://localhost:3000"
  // value: "https://yowl-backend-pgxt.onrender.com"
  value: "https://yowl-api-lisa-eriksens-projects.vercel.app/"
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
