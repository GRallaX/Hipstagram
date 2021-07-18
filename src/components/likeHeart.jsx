import { useRef } from "react";
import { likePost } from "../api/posts";

import { toast } from "react-toastify";
import { LikeBtnDef, LikeBtnLiked } from "../images/heartBtn.js";

export const LikeHeart = ({
  post,
  likes,
  setLikes,
  isLiked,
  setIsLiked,
  currentUser,
}) => {
  const { _id } = post;

  const likeContainer = useRef();

  const handleLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLiked(!isLiked);
      likeContainer.current.className = isLiked ? "unliked" : "liked";
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
      likeContainer.current.removeAttribute("class");
    }
  };

  return (
    <div className="like_heart_container" onDoubleClick={handleLike}>
      <span ref={likeContainer}>
        {!isLiked ? <LikeBtnDef /> : <LikeBtnLiked />}
      </span>
    </div>
  );
};
