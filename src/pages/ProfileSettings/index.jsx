import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { UserSettings } from "./userSettings";
import { SecuritySettings } from "./securitySettings";
import "./profileSettings.css";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const currentUser = useSelector(state => state.currentUser);

  const { id: currentUserId } = currentUser;

  useEffect(() => {
    document.title = "Profile Settings";
  }, []);

  if (pageUserId !== currentUserId) {
    return <Redirect to={"/users/" + currentUserId + "/profile_settings"} />;
  } else {
    return (
      <div className="main">
        <div className="profile_settings_wrapper">
          <UserSettings />
          <SecuritySettings />
        </div>
      </div>
    );
  }
};
