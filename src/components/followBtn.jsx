import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../api/users";
import { useState } from "react";
import { getCurrentUser } from "../store/currentUser/thunks";
import loadingIcon from "../images/loading_small.svg";

export const FollowButton = ({ userId, size }) => {
  const { id: currentUserId, following } = useSelector(
    (state) => state.currentUser
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    following.some((user) => user.id === userId) ? true : false
  );

  if (userId === currentUserId) {
    return (
      <Link to={"/user/" + currentUserId + "/profile_settings"}>
        <button className={"settings_btn " + size}>Settings</button>
      </Link>
    );
  } else {
    return (
      <button
        onClick={async () => {
          setIsLoading(true);
          await followUser(userId);
          await dispatch(getCurrentUser());
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
