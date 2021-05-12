import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/passwordInput";
import { userRegistration } from "../store/currentUser/thunks";
import loadingIcon from "../images/loading_small.svg";

const handleRegistration = (e, dispatch, setIsLoading) => {
  e.preventDefault();
  setIsLoading(true);
  const { login, password, email } = e.target.elements;
  dispatch(userRegistration(login.value, email.value, password.value));
};

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Registration";
  }, []);

  return (
    <div className="registration_container">
      <h2>User Registration</h2>
      <form
        className="registration_form"
        onSubmit={(e) => handleRegistration(e, dispatch, setIsLoading)}
      >
        <TextInput name="login" label="Login" required="true" />
        <TextInput name="email" label="Email" required="true" />
        <PasswordInput />
        <button className="submit_btn" type="submit">
          {isLoading ? <img src={loadingIcon} alt="loadingIcon" /> : "Sign up"}
        </button>
      </form>
      <div className="switch_forms">
        <span>
          Have an account?
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  );
};
