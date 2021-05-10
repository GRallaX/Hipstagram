import { useState } from "react";

import { commentBtn } from "../images/commentBtn.js";
import { likeBtnDef, likeBtnLiked } from "../images/heartBtn.js";
import { likePost } from "../api/posts";
import { useSelector } from "react-redux";

export const LikesAndComments = ({ likes, postId }) => {
  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((user) => user._id === currentUserId) ? true : false
  );

  return (
    <div className="post_btns">
      <div
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
      </div>
      <div className="comment_btn">{commentBtn}</div>
    </div>
  );
};
