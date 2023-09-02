import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { PostItem } from "./postItem";
import {
  postsFetched,
  postsFetching,
  postsError,
} from "../../actions/postActions";

export const PostsList = () => {
  const { posts, loading, error } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPosts() {
      try {
        dispatch(postsFetching());
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        dispatch(postsFetched(data));
      } catch (error) {
        dispatch(postsError(error));
      }
    }

    fetchPosts();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="box p-4 grid gap-x-8 gap-y-4  md:grid-cols-2 lg:grid-cols-3">
        {/*would be better if make it more readeble with variables )) but had no time)))*/}
        {loading ? (
          <h2>Loading ...</h2> // can paste any preloader component here
        ) : error ? (
          <h2>{error.message}</h2> // can paste any error message component here
        ) : (
          posts && posts.map((post) => <PostItem post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
};
