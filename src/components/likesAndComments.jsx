import { useSelector } from "react-redux";
import { useState } from "react";

import { commentBtn } from "../images/commentBtn.js";
import { likeBtnDef, likeBtnLiked } from "../images/heartBtn.js";

export const LikesAndComments = ({ likes }) => {
  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    false
    // likes.some((user) => user._id === currentUserId) ? true : false
  );

  return (
    <div className="post_btns">
      <div
        className="like_btn"
        onClick={() => {
          setIsLiked(isLiked ? false : true);
        }}
      >
        {!isLiked ? likeBtnDef : likeBtnLiked}
      </div>
      <div className="comment_btn">{commentBtn}</div>
    </div>
  );
};
