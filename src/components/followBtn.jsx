import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { followUser, getFollowersAndFollowings } from "../api/users";
import loadingIcon from "../images/loading_small.svg";

export const FollowButton = (props) => {
  const { userId, size } = props;

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
        <button className={"follow_btn followed " + size}>My Profile</button>
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
          if (props.user) {
            const { user, setUser } = props;
            const { data: followersAndFollowings } =
              await getFollowersAndFollowings(userId);
            setUser({
              ...user,
              ...followersAndFollowings,
              followersCount: isFollowed
                ? user.followersCount - 1
                : user.followersCount + 1,
            });
          }
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
