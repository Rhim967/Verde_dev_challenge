import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { Button } from "../components/button/button";

import {
  postDetailFetching,
  postDetailFetched,
  postDetailError,
  postUpdated,
  postDelete,
  postCreate,
} from "../actions/postActions";

export const PostDetailPage = () => {
  let { postId } = useParams();

  const { postDetail, loading, error } = useSelector(
    (state) => state.postsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPostDetail(id) {
      try {
        dispatch(postDetailFetching());
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        dispatch(postDetailFetched(data));
      } catch (error) {
        dispatch(postDetailError(error.message));
      }
    }

    fetchPostDetail(postId);
  }, [dispatch, postId]); //dispatch, title, body, postId

  const postForm = useForm(); //{ register, handleSubmit }
  const onUpdatePost = () => {
    //console.log({ userId: postDetail.userId, id: postDetail.id, ...data });
    const post = {
      userId: postDetail.userId,
      id: postDetail.id,
      ...postForm.getValues(),
    };
    dispatch(postUpdated(post, dispatch));
  };

  const onDeletePost = () => {
    const id = postDetail.id;
    dispatch(postDelete(id, dispatch));
    postForm.reset();
  };

  const onCreatePost = () => {
    const post = { ...postForm.getValues(), userId: 1 }; // or you can get id of user from store
    dispatch(postCreate(post, dispatch));
    postForm.reset();
  };

  const loader = loading && <h2>Loading ...</h2>;
  const err = error && <h2>{error.message}</h2>;

  return (
    <div className="wraper grid">
      <div className="flex flex-col w-full lg:w-2/3">
        {loader}
        {err}
        {postDetail && !loader && (
          <>
            <div className="head flex justify-between items-center">
              <Link to={"/posts"} className="flex items-center">
                <Button
                  buttonType="button"
                  className="w-11 h-10 bg-gray-300 rounded-full"
                  children={<div className="text-sm">back</div>} // you can put here any icon or element
                />
                <p className="ml-3 font-bold text-lg">Posts</p>
              </Link>

              <Button
                onClick={onCreatePost}
                buttonType="button"
                children="+ New Post"
                className="bg-sky-800 rounded-md text-white text-sm font-bold px-2 py-0 h-8"
              ></Button>
            </div>

            <form>
              <div className="mt-5 ml-2 lg:mt-1 lg:ml-14">
                <div className="title-row w-full">
                  <p className="text-xs font-bold">Title</p>
                  <textarea
                    className="w-full bg-gray-100 mt-1 rounded-sm h-20 p-4 font-bold overflow-hidden resize-none"
                    {...postForm.register("title")}
                    defaultValue={postDetail.title || ""}
                  ></textarea>
                </div>

                <div className="descr-row w-full relative">
                  <p className="text-xs font-bold">Detail</p>
                  <p className="absolute text-[10px] text-gray-400 top-7 left-2">
                    content
                  </p>
                  <textarea
                    className="w-full bg-gray-100 text-sm text-gray-500 font-medium mt-1 rounded-sm h-32 p-5 overflow-hidden resize-none"
                    {...postForm.register("body")}
                    defaultValue={postDetail.body || ""}
                  ></textarea>
                </div>
              </div>
            </form>

            <div className="box flex justify-end mt-3">
              <Button
                onClick={onDeletePost}
                buttonType="button"
                children="delete"
                className="bg-red-700 rounded-md text-white text-sm font-bold px-2 py-0 h-8 mr-5"
              ></Button>

              <Button
                onClick={onUpdatePost}
                buttonType="button"
                children="Update"
                className="bg-sky-800 rounded-md text-white text-sm font-bold px-2 py-0 h-8"
              ></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
