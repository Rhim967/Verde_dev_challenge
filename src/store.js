//import { createStore, combineReducers, applyMiddleware } from "redux";
//import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "./reducers/postsReducer";
import { userReducer } from "./reducers/userReducer";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { userReducer, postsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
