import { createAction } from "@reduxjs/toolkit";

export const userLoging = createAction("USER_LOGIN_REQUEST"); // fetching all posts
export const userLogged = createAction("USER_LOGIN_SUCCESS"); // save fetched posts to store
export const userError = createAction("USER_LOGIN_FAIL", (err) => ({
  payload: {
    error: err,
  },
})); // if fetching are feiled
