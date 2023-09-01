import { createReducer } from "@reduxjs/toolkit";

import { userLoging, userLogged, userError } from "../actions/userActions";

const initState = {
  user: { authorized: false },
  loading: false,
};

export const userReducer = createReducer(initState, (builder) => {
  builder
    .addCase(userLoging, (state) => {
      state.loading = true;
    })
    .addCase(userLogged, (state, action) => {
      state.user.authorized = action.payload;
      state.loading = false;
    });
});
