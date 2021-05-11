import { useState } from "react";

import { likeBtnDef, likeBtnLiked } from "../images/heartBtn.js";
import { likePost } from "../api/posts";
import { useSelector } from "react-redux";

export const LikeButton = ({ likes, postId }) => {
  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((user) => user._id === currentUserId) ? true : false
  );

  return (
    <span
      className="like_btn"
      onClick={async () => {
        try {
          setIsLiked(isLiked ? false : true);
          await likePost(postId);
        } catch (e) {
          console.log(e.response.data);
        }
      }}
    >
      {!isLiked ? likeBtnDef : likeBtnLiked}
    </span>
  );
};
