import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/currentUser/thunks";

import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/passwordInput";
import loadingIcon from "../images/loading_small.svg";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const validation = {
    login: {
      required: { value: true, message: "Login is required" },
      maxLength: {
        value: 30,
        message: "Login should contain 2–30 characters",
      },
      minLength: {
        value: 2,
        message: "Login should contain 2–30 characters",
      },
      pattern: {
        value: /^[A-Z0-9]+$/gi,
        message: "Login should contain only numers and letters",
      },
    },

    password: {
      required: { value: true, message: "Password is required" },
      maxLength: {
        value: 16,
        message: "Password should contain 8–16 characters",
      },
      minLength: {
        value: 8,
        message: "Password should contain 8–16 characters",
      },
    },
  };

  const handleLogin = async ({ login, password }) => {
    setIsLoading(true);
    const fetchLogin = await dispatch(logInUser(login, password));
    if (fetchLogin.response) {
      console.log(fetchLogin.response);
      setIsLoading(false);
      setError("form", {
        type: "login",
        message: fetchLogin.response?.data || "Incorrect login or password",
      });
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="login_container">
      <h2>Login</h2>
      <form className="login_form" onSubmit={handleSubmit(handleLogin)}>
        <TextInput
          label="Login"
          message={errors}
          clearErrors={clearErrors}
          {...register("login", validation.login)}
        />
        <PasswordInput
          label="Password"
          message={errors}
          clearErrors={clearErrors}
          {...register("password", validation.password)}
        />
        <button
          className="submit_btn"
          type="submit"
          aria-labelledby="Send credentials"
        >
          {isLoading ? <img src={loadingIcon} alt="loadingIcon" /> : "Log In"}
        </button>
        {errors.form && <span className="message">{errors.form.message}</span>}
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
