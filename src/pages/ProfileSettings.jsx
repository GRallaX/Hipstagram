import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteUser } from "../api/users";
import {
  logOutUser,
  updateCurrentUser,
  updateUsersPassword,
} from "../store/currentUser/thunks";

import { Avatar } from "../components/avatar";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const dispatch = useDispatch();
  const {
    id: currentUserId,
    email,
    lastName,
    login,
    avatar,
  } = useSelector(state => state.currentUser);
  useEffect(() => {
    document.title = "Profile Settings";
  }, []);

  if (pageUserId !== currentUserId) {
    return <Redirect to={"/users/" + currentUserId + "/profile_settings"} />;
  } else {
    return (
      <div className="main">
        <h2>Profile Settings</h2>
        <Avatar avatar={avatar} size="big">
          <button type="submit">Change</button>
        </Avatar>
        <button
          onClick={() =>
            dispatch(updateCurrentUser("Alex", lastName, email, login, avatar))
          }
        >
          Update currentUser
        </button>
        <button
          onClick={() =>
            dispatch(
              updateUsersPassword(login, "Qwerty1234", "Qwerty123", "Qwerty123")
            )
          }
        >
          Update password
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteUser(currentUserId);
            dispatch(logOutUser());
          }}
        >
          Delete User
        </button>
      </div>
    );
  }
};
