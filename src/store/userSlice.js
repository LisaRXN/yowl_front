import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    token: null,
    
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken} = userSlice.actions;

export default userSlice.reducer;
