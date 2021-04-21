import { getFeed } from "../store/posts/thunks";
import { getComments } from "../store/comments/thunks";
import { useDispatch, useSelector } from "react-redux";

export const Feed = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.posts);

  return (
    <main>
      <h2>Feed</h2>
      <div>
        <button onClick={() => dispatch(getFeed())}>Get feed</button>
        <button
          onClick={() => {
            feed.forEach((post) => dispatch(getComments(post._id)));
          }}
        >
          Get feed comments
        </button>
      </div>
    </main>
  );
};
