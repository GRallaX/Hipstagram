import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userRegistration } from "../../store/currentUser/thunks";
import validation from "./validation";

import { TextInput } from "./textInput";
import { PasswordInput } from "./passwordInput";
import loadingIcon from "../../images/loading_small.svg";
import { searchUsersByLogin } from "../../api/users";
import { toast } from "react-toastify";
import Logo from "../../images/logo 1.png";

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const history = useHistory();

  const handleRegistration = async ({ login, email, password1 }) => {
    setIsLoading(true);
    const fetchRegistration = await dispatch(
      userRegistration(login, email, password1)
    );
    if (typeof fetchRegistration === "string") {
      history.push("/users/" + fetchRegistration);
    }
    if (fetchRegistration.response) {
      console.log(fetchRegistration.response);
      setIsLoading(false);
      setError("form", {
        type: "server",
        message:
          fetchRegistration.response?.data ||
          "Incorrect login, email or password",
      });
    }
  };

  const serverLoginValidation = useCallback(async login => {
    if (
      30 > login.length &&
      login.length >= 2 &&
      login.search(/^[A-Z0-9]+$/gi) !== -1
    ) {
      try {
        const { data: foundedUsers } = await searchUsersByLogin(login);
        if (
          foundedUsers.length &&
          foundedUsers.some(user => user.login === login)
        ) {
          return `Login "${login}" is not available`;
        } else {
          return true;
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
      }
    }
  }, []);

  let password = watch("password");
  let checkPassword = watch("password1");
  useEffect(() => {
    if (password === checkPassword) {
      if (errors.password?.type === "checkEqual") clearErrors("password");
      if (errors.password1?.type === "checkEqual") clearErrors("password1");
    }
    if (password !== checkPassword) {
      if (password && checkPassword) {
        if (!errors.password) {
          setError("password", {
            type: "checkEqual",
            message: "Passwords should be equal",
          });
        }
        if (!errors.password1) {
          setError("password1", {
            type: "checkEqual",
            message: "Passwords should be equal",
          });
        }
      }
    }
  }, [
    clearErrors,
    password,
    checkPassword,
    setError,
    errors.password,
    errors.password1,
  ]);

  useEffect(() => {
    document.title = "Registration";
  }, []);

  return (
    <div className="form_wrapper">
      <h1 className="header">
        <img src={Logo} alt="hip logo" />
        Hipstagram
      </h1>
      <div className="form_container registration">
        <h2>Registration</h2>
        <form className="form" onSubmit={handleSubmit(handleRegistration)}>
          <TextInput
            label="Login"
            message={errors}
            setError={setError}
            clearErrors={clearErrors}
            serverValidation={serverLoginValidation}
            {...register("login", validation.login)}
          />
          <TextInput
            label="Email"
            message={errors}
            clearErrors={clearErrors}
            {...register("email", validation.email)}
          />
          <PasswordInput
            label="Passsword"
            message={errors}
            clearErrors={clearErrors}
            passwordShown={passwordShown}
            setPasswordShown={setPasswordShown}
            {...register("password", validation.password)}
          />
          <PasswordInput
            label="Confirm password"
            message={errors}
            clearErrors={clearErrors}
            passwordShown={passwordShown}
            setPasswordShown={setPasswordShown}
            {...register("password1", validation.password1)}
          />
          <button
            className="submit_btn"
            type="submit"
            aria-labelledby="Send credentials"
            disabled={Object.keys(errors).length ? true : undefined}
          >
            {isLoading ? (
              <img src={loadingIcon} alt="loadingIcon" />
            ) : (
              "Sign up"
            )}
          </button>
          {/* {errors.form && ( */}
          <span className="message">errror msrfrf</span>
          {/* )} */}
        </form>
      </div>
      <div className="switch_forms">
        <span>
          Have an account?
          <Link to="/login">Log In</Link>
        </span>
      </div>
    </div>
  );
};
