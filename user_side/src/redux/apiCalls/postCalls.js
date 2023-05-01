import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  addLikeStart,
  addLikeSuccess,
  addLikeFailure,
} from "../postReducers";

import { userRequest } from "../../requestMethod";

export const createPost = async (dispatch, post, user_id) => {
  dispatch(createPostStart());
  try {
    console.log(post);
    const res = await userRequest.post(`/posts/createPost/${user_id}`, post);
    dispatch(createPostSuccess());
    allPosts(dispatch, 1, user_id);
  } catch (err) {
    // const error = err.response.data.msg;
    // console.log(err);
    dispatch(createPostFailure());
  }
};

export const allPosts = async (dispatch, page, id) => {
  dispatch(getPostsStart());
  try {
    // console.log(id);
    const res = await userRequest.get(`/posts/allPosts/${id}/?page=${page}`);
    // console.log("DASDF", ...res.data);
    if (res.data) {
      dispatch(getPostsSuccess(res.data));
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    dispatch(getPostsFailure(err));
  }
};

export const addComment = async (dispatch, body, id) => {
  dispatch(addCommentStart());
  try {
    console.log("BODY ", body);
    const res = await userRequest.post(`/posts/post/${id}/comment`, body);
    console.log(res.data);
    dispatch(addCommentSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(addCommentFailure("Got an error during add your comment"));
  }
};

export const addLike = async (dispatch, body, id, like) => {
  dispatch(addLikeStart());
  try {
    const res = await userRequest.post(`posts/like/post/${id}`, body);
    console.log({ id, like });
    dispatch(addLikeSuccess({ id, like }));
  } catch (err) {
    dispatch(addLikeFailure("You have already liked this post:)"));
  }
};
