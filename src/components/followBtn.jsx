import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { followUserById } from "../store/users/thunks";

export const FollowButton = ({ userId, size }) => {
  const { id: currentUserId, following } = useSelector(
    (state) => state.currentUser
  );

  const isFollowed = following.some((user) => user.id === userId)
    ? true
    : false;

  if (size === "big_btn" && userId === currentUserId) {
    return (
      <Link to={"/user/" + currentUserId + "/profile_settings"}>
        <button className="settings_btn">Settings</button>
      </Link>
    );
  } else {
    return (
      <button
        onClick={() => followUserById(userId)}
        className={
          "follow_btn " + isFollowed
            ? "followed"
            : "not_followed" + size === "big_btn" && "big_btn"
        }
      >
        {isFollowed ? "Subscribe" : "Unsubscribe"}
      </button>
    );
  }
};
