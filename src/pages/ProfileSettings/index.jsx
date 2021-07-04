import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteUser } from "../../api/users";
import {
  logOutUser,
  updateCurrentUser,
  updateUsersPassword,
} from "../../store/currentUser/thunks";

import { Avatar } from "../../components/avatar";
import { useForm } from "react-hook-form";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const {
    id: currentUserId,
    email,
    firstName,
    lastName,
    login,
    avatar,
  } = currentUser;

  const [editingField, setEditingField] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const validation = {
    firstName: {
      required: { value: true, message: "First name is required" },
      maxLength: {
        value: 8,
        message: "First name should contain 2–8 characters",
      },
      minLength: {
        value: 2,
        message: "First name should contain 2–8 characters",
      },
      pattern: {
        value: /^[A-Z]+$/gi,
        message: "First name should contain only numers and letters",
      },
    },
  };

  useEffect(() => {
    document.title = "Profile Settings";
  }, []);

  const SubmitButton = () => {
    return (
      <button className="submit_btn" type="submit">
        Submit
      </button>
    );
  };

  const ChangeButton = ({ name }) => {
    return (
      <button
        className="change_btn"
        type="button"
        onClick={e => {
          e.preventDefault();
          setEditingField(name);
        }}
      >
        Change
      </button>
    );
  };

  const CancelButton = ({ name }) => {
    return (
      <button
        className="cancel_btn"
        type="button"
        onClick={e => {
          e.preventDefault();
          setEditingField(false);
          setValue(name, currentUser[name]);
          unregister(name);
        }}
      >
        Cancel
      </button>
    );
  };

  if (pageUserId !== currentUserId) {
    return <Redirect to={"/users/" + currentUserId + "/profile_settings"} />;
  } else {
    return (
      <div className="main">
        <h2>Profile Settings</h2>
        <div className="avatar_wrapper">
          <Avatar avatar={avatar} size="big">
            <button type="submit">Change</button>
          </Avatar>
        </div>
        <div className="data_wrapper">
          <form
            className="data"
            onSubmit={handleSubmit(data => {
              const key = Object.keys(data)[0];
              if (data[key] === currentUser[key]) {
                console.log("no changes");
              } else {
                console.log(`data sent: type – ${key}, value – ${data[key]}`);
              }
              unregister(editingField);
              setEditingField(false);
            })}
          >
            <label>
              First name
              <input
                defaultValue={firstName}
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Name"
                {...(editingField === "firstName"
                  ? register("firstName", validation.firstName)
                  : { disabled: true })}
              />
              {errors.firstName && (
                <span className="message">{errors.firstName.message}</span>
              )}
              {editingField === "firstName" ? (
                <>
                  <CancelButton name="firstName" /> <SubmitButton />
                </>
              ) : (
                <ChangeButton name="firstName" />
              )}
            </label>
          </form>
        </div>
      </div>
    );
  }
};
