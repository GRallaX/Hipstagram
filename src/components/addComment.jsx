import { useRef, useState } from "react";
import { postComment } from "../api/comments";

import loadingIcon from "../images/loading_small.svg";

export const AddComment = ({ postId, comments, setComments }) => {
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const formRef = useRef();

  const handleTextInput = e => {
    setCommentText(e.target.value.trim());
    if (e.target.value) {
      e.target.style.height = "22px";
      e.target.style.height = e.target.scrollHeight + "px";
    } else {
      e.target.removeAttribute("style");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPostingComment(true);

    try {
      const { data: postedComment } = await postComment(postId, commentText);
      setComments([...comments, postedComment]);
      setPostingComment(false);
      e.target.elements.comment_text.value = "";
      setCommentText("");
    } catch (e) {
      console.log(e.response);
      setPostingComment(false);
    }
  };

  const handleOnEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if (commentText) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  return (
    <div className="add_comment_container">
      <form className="add_comment_form" onSubmit={handleSubmit} ref={formRef}>
        <div className="text_wrapper">
          <textarea
            className="new_comment_text"
            name="comment_text"
            placeholder="Add a comment..."
            aria-label="Add a comment"
            maxLength="60"
            onChange={handleTextInput}
            onKeyDown={handleOnEnterPress}
          />
        </div>
        <div className="add_comment_btn_container">
          <button
            className={
              commentText ? "add_comment_btn" : "add_comment_btn disabled"
            }
            type="submit"
            disabled={commentText ? false : true}
          >
            {postingComment ? <img src={loadingIcon} alt="1" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
