import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logInUser } from "../../store/currentUser/thunks";

import "./loginForm.css";
import { LoginInput } from "../../components/loginInput";
import { PasswordInput } from "../../components/passwordInput";

export const LoginForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Hipstagram - Login";
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            logInUser(
              e.target.elements.login.value,
              e.target.elements.password.value
            )
          );
        }}
      >
        <LoginInput />
        <PasswordInput />
        <button
          className="btn submit"
          type="submit"
          // onClick={() => {
          //   dispatch(logInUser("Alex2141", "Qwerty123"));
          // }}
        >
          Log In
        </button>
      </form>
      <div className="switch_forms">
        <span>
          Don't have an account?
          <Link to="/login/registration">Sign up</Link>
        </span>
      </div>
    </div>
  );
};
