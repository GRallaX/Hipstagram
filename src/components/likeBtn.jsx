import { useRef } from "react";
import { likePost } from "../api/posts";

import { LikeBtnDef, LikeBtnLiked } from "../images/heartBtn.js";

export const LikeButton = ({ postId, isLiked, setIsLiked, updatePost }) => {
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
          if (updatePost) updatePost();
        } catch (e) {
          setIsLiked(isLiked ? false : true);
          console.log(e.response);
        }
      }}
    >
      {!isLiked ? <LikeBtnDef /> : <LikeBtnLiked />}
    </span>
  );
};
