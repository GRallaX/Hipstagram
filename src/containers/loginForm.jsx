import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logInUser } from "../store/currentUser/thunks";

import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/passwordInput";
import loadingIcon from "../images/loading_small.svg";

const handleLogin = (e, dispatch, setIsLoading) => {
  e.preventDefault();
  setIsLoading(true);
  const { login, password } = e.target.elements;
  dispatch(logInUser(login.value, password.value));
};

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="login_container">
      <h2>Login</h2>
      <form
        className="login_form"
        onSubmit={(e) => handleLogin(e, dispatch, setIsLoading)}
      >
        <TextInput name="login" label="Login" required="true" />
        <PasswordInput />
        <button className="submit_btn" type="submit">
          {isLoading ? <img src={loadingIcon} alt="loadingIcon" /> : "Log In"}
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
