import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fetching: false,
    error: null,
    currUser: null,
  },
  reducers: {
    registerStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.fetching = false;
      state.error = null;
      state.currUser = action.payload;
    },
    registerfailure: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    editStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    editSuccess: (state, action) => {
      state.fetching = false;
      state.error = null;
      state.currUser = { ...state.currUser, ...action.payload };
    },
    editfailure: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    loginStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.fetching = false;
      state.error = null;
      state.currUser = action.payload;
    },
    loginfailure: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    logoutStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.fetching = false;
      state.error = null;
      state.currUser = null;
    },
    logoutfailure: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    closeError: (state) => {
      state.fetching = false;
      state.error = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerfailure,
  editStart,
  editSuccess,
  editfailure,
  loginStart,
  loginSuccess,
  loginfailure,
  logoutStart,
  logoutSuccess,
  logoutfailure,
  closeError,
} = userSlice.actions;
export default userSlice.reducer;
