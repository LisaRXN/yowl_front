import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    token: null,
    googleUser: false
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
    setGoogleUser: (state, action) => {
      state.googleUser = action.payload;
    },
  },
});

export const { setUser, setToken, setGoogleUser} = userSlice.actions;

export default userSlice.reducer;
