import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fetching: false,
    error: false,
    currUser: null,
  },
  reducers: {
    registerStart: (state, action) => {
      state.fetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.fetching = false;
      state.error = false;
      state.currUser = action.payload;
    },
    registerfailure: (state) => {
      state.error = true;
      state.fetching = false;
    },
    loginStart: (state, action) => {
      state.fetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.fetching = false;
      state.error = false;
      state.currUser = action.payload;
    },
    loginfailure: (state) => {
      state.error = true;
      state.fetching = false;
    },
    logoutStart: (state, action) => {
      state.fetching = true;
      state.error = false;
    },
    logoutSuccess: (state, action) => {
      state.fetching = false;
      state.error = false;
      state.currUser = null;
    },
    logoutfailure: (state) => {
      state.error = true;
      state.fetching = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerfailure,
  loginStart,
  loginSuccess,
  loginfailure,
  logoutStart,
  logoutSuccess,
  logoutfailure,
} = userSlice.actions;
export default userSlice.reducer;
