import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCurrentUser,
  logInUser,
  logOutUser,
  updateCurrentUser,
  updateUsersPassword,
  userRegistration,
} from "./store/currentUser/thunks";
import { getFeed } from "./store/posts/thunks";
import { getComments } from "./store/comments/thunks";
import { useState } from "react";

// import { getUsers } from "./store/users/actions";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { token, email, firstName, lastName, login, avatar, id } = useSelector(
    (state) => state.currentUser
  );
  const { feed } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!!token && !login) {
      (async () => {
        await dispatch(getCurrentUser());
        setLoading(false);
      })();
    } else if (!token) {
      setLoading(false);
    }
  }, [login, token, dispatch]);
  if (loading) {
    return (
      <div>
        <img src="./Loading_icon.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Hipstagram</h1>

        <div>
          <span>Token:{!token ? "no token" : token}</span> <br />
          <span>email: {!email ? "no email" : email}</span> <br />
          <span>firstName: {!firstName ? "no firstName" : firstName}</span>{" "}
          <br />
          <span>lastName: {!lastName ? "no lastName" : lastName}</span> <br />
          <span>login: {!token ? "no login" : login}</span> <br />
          <span>id: {!id ? "no id" : id}</span> <br />
          <button
            onClick={async () => {
              setLoading(true);
              await dispatch(logInUser("Alex2141", "Qwerty123"));
              await dispatch(getCurrentUser());
              setLoading(false);
            }}
          >
            Log in
          </button>
          <button onClick={() => dispatch(logOutUser())}>Log out</button>
          <button
            onClick={async () => {
              await dispatch(
                userRegistration(
                  "Alex2141",
                  "alexey2141@gmail.com",
                  "Qwerty123"
                )
              );
            }}
          >
            User registration
          </button>
          <button
            onClick={() =>
              dispatch(
                updateCurrentUser("Alex", lastName, email, login, avatar)
              )
            }
          >
            Update currentUser
          </button>
          <button
            onClick={() =>
              dispatch(
                updateUsersPassword(
                  login,
                  "Qwerty1234",
                  "Qwerty123",
                  "Qwerty123"
                )
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
  }
};

export default App;
