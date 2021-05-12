import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { followUser } from "../api/users";
import { useState } from "react";
import loadingIcon from "../images/loading_small.svg";

export const FollowButton = ({ userId, size }) => {
  const { id: currentUserId, following } = useSelector(
    (state) => state.currentUser
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    following.some((user) => user.id === userId) ? true : false
  );

  if (userId === currentUserId && size === "big_btn") {
    return (
      <Link to={"/users/" + currentUserId + "/profile_settings"}>
        <button className={"settings_btn " + size}>Profile Settings</button>
      </Link>
    );
  } else if (userId === currentUserId) {
    return (
      <Link to={"/users/" + currentUserId}>
        <button className={"follow_btn " + size}>My Profile</button>
      </Link>
    );
  } else {
    return (
      <button
        onClick={async () => {
          setIsLoading(true);
          await followUser(userId);
          setIsFollowed(isFollowed === true ? false : true);
          setIsLoading(false);
        }}
        className={
          "follow_btn " + (isFollowed ? "followed " : "not_followed ") + size
        }
      >
        {isLoading ? (
          <img src={loadingIcon} alt="loadingIcon" />
        ) : isFollowed ? (
          "Unsubscribe"
        ) : (
          "Subscribe"
        )}
      </button>
    );
  }
};
