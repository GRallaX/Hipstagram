import { useRef } from "react";
import { likePost } from "../api/posts";

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

  return (
    <div
      className="like_heart_container"
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        (async () => {
          try {
            setIsLiked(isLiked ? false : true);
            likeContainer.current.className = isLiked ? "unliked" : "liked";
            setLikes(
              isLiked
                ? likes.filter((like) => like._id !== currentUser._id)
                : [...likes, currentUser]
            );
            await likePost(_id);
          } catch (e) {
            console.log(e.response);
            setIsLiked(isLiked);
            setLikes([...likes]);
            likeContainer.current.removeAttribute("class");
          }
        })();
      }}
    >
      <span ref={likeContainer}>
        {!isLiked ? <LikeBtnDef /> : <LikeBtnLiked />}
      </span>
    </div>
  );
};
