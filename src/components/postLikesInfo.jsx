import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WithoutLikes = () => {
  return <span className="likes_count">No likes yet</span>;
};

const WithoutSubscribes = ({ likes }) => {
  return (
    <span className="likes_count_btn">
      {likes.length + (likes.length === 1 ? " like" : " likes")}
    </span>
  );
};

const WithSubscribes = ({ likes, likedSubscribe }) => {
  return (
    <>
      <span className="likes_count">
        Liked by{" "}
        <Link to={"/users/" + likedSubscribe.id}>{likedSubscribe.login}</Link>
      </span>
      {likes.length > 1 && (
        <>
          <span> and </span>
          <span className="likes_count_btn">
            {likes.length - 1 + (likes.length === 2 ? " other" : " others")}
          </span>
        </>
      )}
    </>
  );
};

export const PostLikes = ({ likes, setModalLikes }) => {
  const currentUser = useSelector((state) => state.currentUser);

  let likedSubscribe;

  if (!likes.length) {
    return (
      <div className="post_likes_info">
        <WithoutLikes />
      </div>
    );
  } else if (
    likes.length > 0 &&
    likes.find(
      (userLikedBy) =>
        (likedSubscribe = currentUser.following.find(
          (followingUser) => userLikedBy._id === followingUser.id
        ))
    )
  ) {
    return (
      <div className="post_likes_info">
        <WithSubscribes likes={likes} likedSubscribe={likedSubscribe} />
      </div>
    );
  } else {
    return (
      <div className="post_likes_info">
        <WithoutSubscribes likes={likes} />
      </div>
    );
  }
};
