import { useRef } from "react";
import { likePost } from "../api/posts";

import { LikeBtnDef, LikeBtnLiked } from "../images/heartBtn.js";

export const LikeHeart = ({ post, isLiked, setIsLiked, updateFeed }) => {
  const { _id } = post;

  const likeContainer = useRef();

  return (
    <div
      className="like_heart_container"
      onDoubleClick={async () => {
        try {
          setIsLiked(isLiked ? false : true);
          likeContainer.current.className = isLiked ? "unliked" : "liked";
          await likePost(_id);
          updateFeed();
        } catch (e) {
          setIsLiked(isLiked ? false : true);
          console.log(e.response);
        }
      }}
    >
      <span ref={likeContainer}>
        {!isLiked ? <LikeBtnDef /> : <LikeBtnLiked />}
      </span>
    </div>
  );
};
