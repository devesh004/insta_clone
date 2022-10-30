import { publicRequest, userRequest } from "../../requestMethod";

export const getConversations = async (id) => {
  try {
    const res = await userRequest.get("/conversation/" + id);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id) => {
  try {
    const res = await publicRequest.get("/conversation/user/" + id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getChats = async (id) => {
  try {
    const res = await publicRequest.get("/message/" + id);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendMessages = async (mess) => {
  try {
    const res = await publicRequest.post("/message", mess);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTotalChat = async (id) => {
  try {
    const res = await userRequest.get("/totalChat/:id");
    return res.data;
  } catch (err) {
    console.log("Heyy error is here !");
  }
};
