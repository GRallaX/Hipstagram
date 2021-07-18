import { useRef } from "react";
import { toast } from "react-toastify";
import { likePost } from "../api/posts";

import { LikeBtnDef, LikeBtnLiked } from "../images/heartBtn.js";

export const LikeButton = ({
  post,
  likes,
  setLikes,
  isLiked,
  setIsLiked,
  currentUser,
}) => {
  const { _id } = post;

  const likeContainer = useRef();

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      likeContainer.current.className = isLiked
        ? "like_btn_container unliked"
        : "like_btn_container liked";
      setLikes(
        isLiked
          ? likes.filter(like => like._id !== currentUser._id)
          : [...likes, currentUser]
      );
      await likePost(_id);
    } catch (e) {
      toast.error(e.response?.data || e.message);
      setIsLiked(isLiked);
      setLikes([...likes]);
      likeContainer.current.className = "like_btn_container";
    }
  };

  return (
    <span
      tabIndex="0"
      className="like_btn_container"
      ref={likeContainer}
      onClick={handleLike}
      onKeyUp={e => {
        if (e.key === "Enter") {
          handleLike();
        }
      }}
    >
      {!isLiked ? <LikeBtnDef /> : <LikeBtnLiked />}
    </span>
  );
};
