import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRegistration } from "../store/currentUser/thunks";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Hipstagram - Registration";
  }, []);

  return (
    <div className="main">
      <h2>Registration</h2>
      <button
        onClick={() => {
          dispatch(userRegistration("Alex2141", "alex@gmail.com", "Qwerty123"));
        }}
      >
        User registration
      </button>
      <Link to="/login">Login</Link>
    </div>
  );
};
