import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, fetchPostComments } from "../api/comments";

import loadingIcon from "../images/loading_small.svg";
import { ReactComponent as ThreeDotsMenu } from "../images/three-dots-menu.svg";

const Comment = ({ comment, comments, setComments }) => {
  const [showBtns, setShowBtns] = useState(false);
  const { id, owner } = comment;
  const { id: currentUserId } = useSelector((state) => state.currentUser);

  const handleDeleteComment = async (e) => {
    try {
      await deleteComment(id);
      setComments(
        comments.filter((comment) => {
          return comment.id !== id;
        })
      );
    } catch {
      console.log(e.response);
    }
  };

  return (
    <li
      className="feed_comment"
      onMouseLeave={() => {
        if (showBtns) setShowBtns(false);
      }}
    >
      <div>
        <span className="comment_text">
          <Link to={"/users/" + owner.id} className="feed_user_ref">
            {owner.login}
          </Link>
          {" " + comment.text}
        </span>
      </div>
      <div className="comment_info">
        <div className="comment_menu">
          {currentUserId === owner.id && (
            <>
              <div
                className="menu_toggle"
                onClick={() => setShowBtns(showBtns ? false : true)}
              >
                <ThreeDotsMenu />
              </div>
              <div className={!showBtns ? "btns hidden" : "btns"}>
                <button className="edit">edit</button>
                <button className="delete" onClick={handleDeleteComment}>
                  delete
                </button>
              </div>
            </>
          )}
        </div>
        {comment.isEdited && <span className="edited">edited</span>}
      </div>
    </li>
  );
};

export const FeedComments = ({
  postId,
  postTitle,
  postOwner,
  comments,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: comments } = await fetchPostComments(postId);
        if (!cleanupFunction) {
          setComments(comments);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();

    return () => (cleanupFunction = true);
  }, [postId, setComments]);

  if (isLoading || !comments) {
    return (
      <div className="comments_container">
        <div className="loading_comments">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="comments_container">
        <ul className="comments">
          <li className="feed_comment owner">
            <span>
              <Link to={"/users/" + postOwner.id} className="feed_user_ref">
                {postOwner.login}
              </Link>
              {" " + postTitle}
            </span>
          </li>
          {comments.map((comment) => {
            return (
              <Comment
                key={"comment_" + comment.id}
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            );
          })}
        </ul>
      </div>
    );
  }
};
