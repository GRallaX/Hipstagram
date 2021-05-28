import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PostLikes = ({ likes, setModalLikes }) => {
  const currentUser = useSelector((state) => state.currentUser);

  let likesTemplate;
  let likedBy;

  if (!likes.length) {
    likesTemplate = <span className="likes_count">No likes yet</span>;
  } else if (
    likes.length > 0 &&
    likes.find(
      (userLikedBy) =>
        (likedBy = currentUser.following.find(
          (followingUser) => userLikedBy._id === followingUser.id
        ))
    )
  ) {
    likesTemplate = (
      <>
        <span className="likes_count">
          Liked by <Link to={"/users/" + likedBy.id}>{likedBy.login}</Link>
        </span>{" "}
        {likes.length > 1 && (
          <>
            <span>and </span>
            <span className="likes_count_btn">
              {likes.length - 1 + " others"}
            </span>
          </>
        )}
      </>
    );
  } else {
    likesTemplate = (
      <span className="likes_count_btn">
        {likes.length + (likes.length === 1 ? " like" : " likes")}
      </span>
    );
  }

  return <div className="post_likes_info">{likesTemplate}</div>;
};
