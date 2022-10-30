import axios from "axios";

// const BaseUrl = window.href + "/api/";
const BaseUrl = "http://localhost:3001/api";

let Token = null;
// console.log(
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currUser
// );
if (
  localStorage.getItem("persist:root") &&
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currUser !==
    null
) {
  Token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currUser.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BaseUrl,
});

export const userRequest = axios.create({
  baseURL: BaseUrl,
  headers: { token: `Bearer ${Token}` },
});
