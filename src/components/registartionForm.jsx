import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRegistration } from "../store/currentUser/thunks";

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  return (
    <div className="main">
      <h2>Registration</h2>
      <button
        onClick={async () => {
          await dispatch(userRegistration("Al42", "al@gmail.com", "Qwerty123"));
        }}
      >
        User registration
      </button>
      <Link to="/login">Login </Link>
    </div>
  );
};
