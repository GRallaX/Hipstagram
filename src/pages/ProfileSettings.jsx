import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Avatar } from "../components/avatar";
import {
  updateCurrentUser,
  updateUsersPassword,
} from "../store/currentUser/thunks";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const dispatch = useDispatch();
  const { id: currentUserId, email, lastName, login, avatar } = useSelector(
    (state) => state.currentUser
  );
  useEffect(() => {
    document.title = "Hipstagram - Profile Settings";
  }, []);

  if (pageUserId !== currentUserId) {
    return <Redirect to={"/users/" + currentUserId + "/profile_settings"} />;
  } else {
    return (
      <main>
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
      </main>
    );
  }
};
