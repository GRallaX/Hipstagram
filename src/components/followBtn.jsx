import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { followUser, getFollowersAndFollowings } from "../api/users";
import loadingIcon from "../images/loading_small.svg";
import { subscribeUser, unSubscribeUser } from "../store/currentUser/thunks";

export const FollowButton = ({ size, user: userProp, setUser }) => {
  const user = {
    firstName: userProp.firstName,
    lastName: userProp.lastName,
    avatar: userProp.avatar,
    followersCount: userProp.followersCount,
    followingCount: userProp.followingCount,
    id: userProp.id || userProp._id,
    email: userProp.email,
    login: userProp.login,
  };

  const { id: userId } = user;

  const dispatch = useDispatch();

  const { id: currentUserId, following } = useSelector(
    state => state.currentUser
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    following.some(user => user.id === userId) ? true : false
  );

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction)
      setIsFollowed(following.some(user => user.id === userId) ? true : false);
    return () => (cleanupFunction = true);
  }, [following, userId]);

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
          try {
            setIsLoading(true);
            await followUser(userId);
            isFollowed
              ? dispatch(unSubscribeUser(userId))
              : dispatch(subscribeUser(user));
            setIsFollowed(!isFollowed);
            setIsLoading(false);
            if (setUser) {
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
          } catch (e) {
            console.log(e.response);
            setIsFollowed(isFollowed);
            if (setUser) {
              setUser({ ...user });
            }
            setIsLoading(false);
          }
        }}
        className={
          "follow_btn " + (isFollowed ? "followed " : "not_followed ") + size
        }
      >
        {isLoading ? (
          <img src={loadingIcon} alt="1" />
        ) : isFollowed ? (
          "Unsubscribe"
        ) : (
          "Subscribe"
        )}
      </button>
    );
  }
};
