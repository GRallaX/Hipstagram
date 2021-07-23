import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInUser } from "../../store/currentUser/thunks";
import validation from "./validation";

import { PasswordInput } from "./passwordInput";
import { TextInput } from "./textInput";
import loadingIcon from "../../images/loading_small.svg";
import Logo from "../../images/logo 1.png";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const formatError = errorText => {
    if (errorText === "Password is not equal")
      return "Your password is invalid. Please try again.";
    if (errorText.match(/(User with email)/g))
      return `User with login "${watch("login")}" not found`;
    return errorText;
  };

  const handleLogin = async ({ login, password }) => {
    setIsLoading(true);
    const fetchLogin = await dispatch(logInUser(login, password));
    if (fetchLogin.response) {
      console.log(fetchLogin.response);
      setIsLoading(false);
      setError("form", {
        type: "server",
        message: fetchLogin.response?.data
          ? formatError(fetchLogin.response.data)
          : "Problem with your login or password",
      });
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="form_wrapper">
      <h1 className="header">
        <img src={Logo} alt="hip logo" />
        Hipstagram
      </h1>
      <div className="form_container login">
        <h2>Sign In</h2>
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
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
            disabled={Object.keys(errors).length ? true : undefined}
          >
            {isLoading ? <img src={loadingIcon} alt="loadingIcon" /> : "Log In"}
          </button>
          <span className="message">{errors.form?.message}</span>
        </form>
      </div>
      <div className="switch_forms">
        <span>
          Don't have an account?
          <Link to="/login/registration">Sign up</Link>
        </span>
      </div>
    </div>
  );
};
