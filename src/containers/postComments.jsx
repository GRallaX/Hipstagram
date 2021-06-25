import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, editComment, fetchPostComments } from "../api/comments";

import { EditingTextModal } from "./smallModals/editingText";

import loadingIcon from "../images/loading_small.svg";
import { ReactComponent as ThreeDotsMenu } from "../images/three-dots-menu.svg";

const Comment = ({ comment, comments, setComments }) => {
  const [showBtns, setShowBtns] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { id, owner, text } = comment;
  const { id: currentUserId } = useSelector((state) => state.currentUser);

  const handleDeleteComment = async (e) => {
    try {
      await deleteComment(id);
      setComments(
        comments.filter((comment) => {
          return comment.id !== id;
        })
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleEditComment = async (text) => {
    try {
      const { data: editedComment } = await editComment(id, text);
      setComments(
        comments.map((cmm) => {
          if (cmm.id === id) {
            cmm = { ...cmm, ...editedComment };
          }
          return cmm;
        })
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <li
      className="comment"
      onMouseLeave={() => {
        if (showBtns) setShowBtns(false);
      }}
    >
      {showEditModal && (
        <EditingTextModal
          header="Comment editing"
          textDefValue={text}
          onSubmitFunc={handleEditComment}
          closeFunc={() => setShowEditModal(false)}
        />
      )}
      <span className="comment_text">
        <Link to={"/users/" + owner.id} className="comment_user_ref">
          {owner.login}
        </Link>
        {" " + comment.text}
      </span>
      <div className="comment_info">
        <div className="comment_menu">
          {currentUserId === owner.id && (
            <>
              <div
                className="menu_toggle"
                onClick={() => setShowBtns(!showBtns)}
              >
                <ThreeDotsMenu />
              </div>
              <div className={!showBtns ? "btns hidden" : "btns"}>
                <button
                  className="edit"
                  onClick={() => {
                    setShowEditModal(true);
                    setShowBtns(false);
                  }}
                >
                  edit
                </button>
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

export const PostComments = ({
  postId,
  postTitle,
  postOwner,
  comments,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;

    const interval = setInterval(() => {
      setUpdate(true);
    }, 15000);

    (async () => {
      try {
        const { data: comments } = await fetchPostComments(postId);
        if (!cleanupFunction) {
          setComments(comments);
          setIsLoading(false);
          setUpdate(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();

    return () => {
      cleanupFunction = true;
      clearInterval(interval);
    };
  }, [postId, setComments, update]);

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
          <li className="comment owner">
            <span>
              <Link to={"/users/" + postOwner.id} className="comment_user_ref">
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
