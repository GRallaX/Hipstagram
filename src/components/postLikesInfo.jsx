import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const handleOpenModalLikes = (e, setModalLikes) => {
  e.preventDefault();
  setModalLikes(true);
};

const WithoutLikes = () => {
  return <span className="likes_count">No likes yet</span>;
};

const WithoutSubscribes = ({ likes, setModalLikes }) => {
  return (
    <span
      className="likes_count_btn"
      onClick={(e) => handleOpenModalLikes(e, setModalLikes)}
    >
      {likes.length + (likes.length === 1 ? " like" : " likes")}
    </span>
  );
};

const WithSubscribes = ({ likes, likedSubscribe, setModalLikes }) => {
  return (
    <>
      <span className="likes_count">
        Liked by{" "}
        <Link to={"/users/" + likedSubscribe.id}>{likedSubscribe.login}</Link>
      </span>
      {likes.length > 1 && (
        <>
          <span> and </span>
          <span
            className="likes_count_btn"
            onClick={(e) => handleOpenModalLikes(e, setModalLikes)}
          >
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
        <WithSubscribes
          likes={likes}
          likedSubscribe={likedSubscribe}
          setModalLikes={setModalLikes}
        />
      </div>
    );
  } else {
    return (
      <div className="post_likes_info">
        <WithoutSubscribes likes={likes} setModalLikes={setModalLikes} />
      </div>
    );
  }
};
