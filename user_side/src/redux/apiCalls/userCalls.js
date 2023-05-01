import {
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
} from "../userReducers";
import { publicRequest, userRequest } from "../../requestMethod";
import { cleanUp } from "../postReducers";

export const logoutUser = async (dispatch) => {
  dispatch(logoutStart());
  try {
    console.log("client trying to log out");
    const res = await userRequest.post("/users/logout");
    // localStorage.removeItem(
    //   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currUser
    //     .accessToken
    // // );
    // localStorage.clear();
    console.log("client log out");
    dispatch(cleanUp());
    dispatch(logoutSuccess());
  } catch (err) {
    console.log("User Register Err ", err);
    dispatch(logoutfailure());
  }
};

export const registerUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/users/signUp", user);
    // console.log(res.data);
    dispatch(registerSuccess(res.data));
    setTimeout(() => {
      logoutUser(dispatch);
    }, 259200000);
  } catch (err) {
    const error = err.response.data.msg;
    dispatch(registerfailure(error));
  }
};

// 259200000
export const loginUser = async (dispatch, user) => {
  dispatch(loginStart());
  let res;
  try {
    res = await publicRequest.post("/users/login", user);
    // console.log("Logged In user ", res.data);
    dispatch(loginSuccess(res.data));
    setTimeout(() => {
      console.log("client logout");
      logoutUser(dispatch);
    }, 259200000);
  } catch (err) {
    const error = err.response.data.msg;
    dispatch(loginfailure(error));
  }
};

export const editUser = async (dispatch, id, body) => {
  dispatch(editStart());
  try {
    console.log("TYPE IS", body.type);
    const res = await userRequest.put(`/users/userEdit/${id}`, body);
    console.log("TYPE IS", body.type);
    if (body.type === "changePass") {
      dispatch(editSuccess(null));
    } else {
      console.log("BODY", body);
      dispatch(editSuccess(body));
    }
  } catch (err) {
    console.log(err);
    dispatch(editfailure(err));
  }
};

export const searchUser = async (input) => {
  try {
    const res = await userRequest.get(`/users/userFind/${input}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const handleFollows = async (id, currentId) => {
  try {
    const res = await userRequest.post(`/users/follow/${id}`, {
      id: currentId,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
