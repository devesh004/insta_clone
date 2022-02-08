import {
  registerStart,
  registerSuccess,
  registerfailure,
  loginStart,
  loginSuccess,
  loginfailure,
  logoutStart,
  logoutSuccess,
  logoutfailure,
} from "../userReducers";
import { publicRequest } from "../../requestMethod";

export const registerUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/users/signUp", user);
    console.log(res.data);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    console.log("User Register Err ", err);
    dispatch(registerfailure());
  }
};

export const loginUser = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("User Register Err ", err);
    dispatch(loginfailure());
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logoutStart());
  try {
    const res = await publicRequest.post("/users/logout");
    console.log(res.data);
    dispatch(logoutSuccess(res.data));
  } catch (err) {
    console.log("User Register Err ", err);
    dispatch(logoutfailure());
  }
};
