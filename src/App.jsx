import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  logInUser,
  logOutUser,
  updateCurrentUser,
  updatePassword,
  userRegistration,
} from "./store/currentUser/actions";

const App = () => {
  const dispatch = useDispatch();
  const { token, email, firstName, lastName, login, avatar, id } = useSelector(
    (state) => state.currentUser
  );

  return (
    <div className="App">
      <h1>Hipstagram</h1>
      <div>
        <span>Token:{!token ? "no token" : token}</span> <br />
        <span>email: {!email ? "no email" : email}</span> <br />
        <span>firstName: {!firstName ? "no firstName" : firstName}</span> <br />
        <span>lastName: {!lastName ? "no lastName" : lastName}</span> <br />
        <span>login: {!token ? "no login" : login}</span> <br />
        <span>id: {!id ? "no id" : id}</span> <br />
        <button
          onClick={() => {
            dispatch(logInUser("Alex2141", "Qwerty123"));
          }}
        >
          Get token
        </button>
        <button onClick={() => dispatch(logOutUser())}>Log out</button>
        <button
          onClick={() => {
            dispatch(getCurrentUser(token));
          }}
        >
          Get currentUser
        </button>
        <button
          onClick={() =>
            dispatch(
              userRegistration("alex21", "alex21@gmail.com", "Qwerty334565")
            )
          }
        >
          User registration
        </button>
        <button
          onClick={() =>
            dispatch(
              updateCurrentUser(token, "ALex21", lastName, email, login, avatar)
            )
          }
        >
          Update currentUser
        </button>
        <button
          onClick={() =>
            dispatch(
              updatePassword(
                login,
                "Qwerty1234",
                token,
                "Qwerty123",
                "Qwerty123"
              )
            )
          }
        >
          Update password
        </button>
      </div>
    </div>
  );
};

export default App;
