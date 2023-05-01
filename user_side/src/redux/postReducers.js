import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    fetching: false,
    error: null,
    posts: [],
  },
  reducers: {
    getPostsStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.fetching = false;
      state.posts.push(...action.payload);
      state.error = null;
    },
    getPostsFailure: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    },
    createPostStart: (state, action) => {
      state.fetching = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.fetching = false;
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    },
    cleanUp: (state) => {
      state.posts = [];
      state.fetching = false;
      state.error = null;
    },
    addCommentStart: (state) => {
      state.fetching = false;
      state.error = null;
    },
    addCommentSuccess: (state, action) => {
      state.posts[
        state.posts.findIndex((post) => post.post_Id === action.payload)
      ].comments += 1;
      state.fetching = false;
      state.error = null;
    },
    addCommentFailure: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    },
    addLikeStart: (state) => {
      state.fetching = false;
      state.error = null;
    },
    addLikeSuccess: (state, action) => {
      state.posts[
        state.posts.findIndex((post) => post.post_Id === action.payload.id)
      ].likes += action.payload.like;
      if (
        state.posts[
          state.posts.findIndex((post) => post.post_Id === action.payload.id)
        ].isLiked === 1
      ) {
        state.posts[
          state.posts.findIndex((post) => post.post_Id === action.payload.id)
        ].isLiked = null;
      } else {
        state.posts[
          state.posts.findIndex((post) => post.post_Id === action.payload.id)
        ].isLiked = 1;
      }
      state.fetching = false;
      state.error = null;
    },
    addLikeFailure: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    },
  },
});

export const {
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
  cleanUp,
} = postSlice.actions;

export default postSlice.reducer;
