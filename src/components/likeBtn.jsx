import { useRef } from "react";
import { likePost } from "../api/posts";

import { likeBtnDef, likeBtnLiked } from "../images/heartBtn.js";

export const LikeButton = ({ postId, isLiked, setIsLiked }) => {
  const likeContainer = useRef();

  return (
    <span
      className="like_btn_container"
      ref={likeContainer}
      onClick={async () => {
        try {
          setIsLiked(isLiked ? false : true);
          likeContainer.current.className = isLiked
            ? "like_btn_container unliked"
            : "like_btn_container liked";
          await likePost(postId);
        } catch (e) {
          setIsLiked(isLiked ? false : true);
          console.log(e.response);
        }
      }}
    >
      {!isLiked ? likeBtnDef : likeBtnLiked}
    </span>
  );
};
