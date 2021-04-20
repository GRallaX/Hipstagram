import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/currentUser/thunks";

export const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          dispatch(logInUser("AlexTest", "Qwerty123"));
        }}
      >
        Log in
      </button>
      <Link to="/login/registration">Registration </Link>
    </div>
  );
};
