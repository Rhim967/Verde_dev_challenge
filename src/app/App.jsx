//import { useState } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Header } from "../components/header/header";
import { AllPostsPage } from "../pages/AllPostsPage";
import { PostDetailPage } from "../pages/PostDetailPage";
import { useSelector } from "react-redux";

function App() {
  const { authorized } = useSelector((state) => state.userReducer.user);
  const mainPage = authorized ? "/posts" : "/"; // redirecting path for user
  //<div>main page</div>;
  //

  return (
    <div className="container">
      <BrowserRouter>
        <Header authorized={authorized} />
        <Routes>
          <Route path="/" element={<Navigate to={mainPage} />} />
          <Route
            path="/posts"
            element={
              authorized ? (
                <AllPostsPage />
              ) : (
                <h2>press Login button for see all your posts</h2>
              )
            } // you can redirect to login page instead of button
          />
          <Route path="/post/:postId" element={<PostDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//    <>
//      <div>
//        <a href="https://vitejs.dev" target="_blank"></a>
//        <a href="https://react.dev" target="_blank"></a>
//      </div>
//      <h1>Vite + React</h1>
//      <div className="card">
//        <p>
//          Edit <code>src/App.jsx</code> and save to test HMR
//        </p>
//      </div>
//      <p className="text-3xl font-bold underline">
//        Click on the Vite and React logos to learn more
//      </p>
//    </>
