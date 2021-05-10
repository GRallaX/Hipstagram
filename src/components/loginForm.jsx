import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/currentUser/thunks";

export const LoginForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Hipstagram - Login";
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          dispatch(logInUser("Alex2141", "Qwerty123"));
        }}
      >
        Log in
      </button>
      <Link to="/login/registration">Registration</Link>
    </div>
  );
};
