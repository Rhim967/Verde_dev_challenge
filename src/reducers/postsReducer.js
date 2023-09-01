import { createReducer } from "@reduxjs/toolkit";

import {
  // list of posts
  postsError,
  postsFetched,
  postsFetching,
  // detail of post
  postDetailFetching,
  postDetailFetched,
  postDetailError,
} from "../actions/postActions";

const initState = {
  posts: [],
  loading: false,
  error: false,
};

// reducer for all posts
export const postsReducer = createReducer(initState, (builder) => {
  builder
    // list of cost cases
    .addCase(postsFetching, (state) => {
      state.loading = true;
    })
    .addCase(postsFetched, (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts = action.payload;
      state.total = action.payload.length;
    })
    .addCase(postsError, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    })

    // detail of post cases
    .addCase(postDetailFetching, (state) => {
      state.loading = true;
    })
    .addCase(postDetailFetched, (state, action) => {
      state.loading = false;
      state.error = false;
      state.postDetail = action.payload;
    })
    .addCase(postDetailError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addDefaultCase(() => {});
});
