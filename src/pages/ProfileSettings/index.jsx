import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { UpdateUserForm } from "./updateUserForm";
import { Avatar } from "../../components/avatar";
import "./profileSettings.css";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const currentUser = useSelector(state => state.currentUser);

  const { id: currentUserId, avatar } = currentUser;

  useEffect(() => {
    document.title = "Profile Settings";
  }, []);

  if (pageUserId !== currentUserId) {
    return <Redirect to={"/users/" + currentUserId + "/profile_settings"} />;
  } else {
    return (
      <div className="main">
        <h2>Profile Settings</h2>
        <div className="settings_wrapper">
          <div className="avatar_wrapper">
            <Avatar avatar={avatar} size="big">
              <button type="submit">Change</button>
            </Avatar>
          </div>
          <div className="update_user_wrapper">
            <UpdateUserForm />
          </div>
        </div>
      </div>
    );
  }
};
