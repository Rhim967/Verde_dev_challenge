import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

// for list of posts
export const postsFetching = createAction("POSTS_LIST_REQUEST"); // fetching all posts
export const postsFetched = createAction("POSTS_LIST_SUCCESS"); // save fetched posts to store
export const postsError = createAction("POSTS_LIST_FAIL", (err) => ({
  payload: {
    error: err,
  },
})); // if fetching are feiled

// for getting detail info of post
export const postDetailFetching = createAction("POSTS_DETAIL_REQUEST");
export const postDetailFetched = createAction("POSTS_DETAIL_SUCCESS");
export const postDetailError = createAction("POSTS_DETAIL_FAIL");

// for update info of post
export const postUpdated = createAction(
  "POSTS_UPDATE_SUCCESS",
  (post, dispatch) => {
    const updatedPost = {};
    async function postDetailUpdate() {
      try {
        dispatch(postDetailFetching());
        const { data } = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          post
        );
        updatedPost = data;
        dispatch(postDetailFetched(updatedPost));
      } catch (error) {
        dispatch(postDetailError(error.message));
      }
    }

    if (post.id && post.userId) {
      postDetailUpdate();
      console.log(`the post number ${post.id} succesfuly updated`);
    } else {
      console.log("there is no mathed post");
    }
    return { payload: updatedPost };
  }
);

// delete post
export const postDelete = createAction(
  "POSTS_DELETE_SUCCESS",
  (id, dispatch) => {
    async function postDelete() {
      try {
        dispatch(postDetailFetching());
        const { data } = await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        dispatch(postDetailFetched(data));
      } catch (error) {
        dispatch(postDetailError(error.message));
      }
    }

    if (id) {
      postDelete();
      console.log(`post number ${id} was seccesfuly deleted`);
    } else {
      console.log(`post not found`);
    }
    return {};
  }
);

// create post
export const postCreate = createAction(
  "POSTS_CREATE_SUCCESS",
  (post, dispatch) => {
    const newPost = {};
    async function postCreate() {
      try {
        dispatch(postDetailFetching());
        const { data } = await axios.post(
          `https://jsonplaceholder.typicode.com/posts`,
          post
        );
        dispatch(postDetailFetched(data));
        newPost = data;
      } catch (error) {
        dispatch(postDetailError(error.message));
      }
    }

    if (!post.id) {
      postCreate();
      console.log("post created successfuly");
    } else {
      console.log("post with this id alredy exist");
    }

    return newPost;
  }
);
