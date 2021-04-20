import { getFeed } from "../store/posts/thunks";
import { getComments } from "../store/comments/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  updateCurrentUser,
  updateUsersPassword,
} from "../store/currentUser/thunks";

export const Feed = () => {
  const dispatch = useDispatch();
  const { email, firstName, lastName, login, avatar, id } = useSelector(
    (state) => state.currentUser
  );
  const { feed } = useSelector((state) => state.posts);

  return (
    <div className="main">
      <h2>Feed</h2>
      <div>
        <span>email: {!email ? "no email" : email}</span> <br />
        <span>firstName: {!firstName ? "no firstName" : firstName}</span> <br />
        <span>lastName: {!lastName ? "no lastName" : lastName}</span> <br />
        <span>login: {!login ? "no login" : login}</span> <br />
        <span>id: {!id ? "no id" : id}</span> <br />
        <button onClick={() => dispatch(logOutUser())}>Log out</button>
        <button
          onClick={() =>
            dispatch(updateCurrentUser("Alex", lastName, email, login, avatar))
          }
        >
          Update currentUser
        </button>
        <button
          onClick={() =>
            dispatch(
              updateUsersPassword(login, "Qwerty1234", "Qwerty123", "Qwerty123")
            )
          }
        >
          Update password
        </button>
      </div>
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
    </div>
  );
};
