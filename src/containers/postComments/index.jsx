import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteComment,
  editComment,
  fetchPostComments,
} from "../../api/comments";

import { EditingTextModal } from "../dialogues/editingText";
import { ReactComponent as Settings } from "../../images/settings_icon.svg";
import loadingIcon from "../../images/loading_small.svg";
import "./postComments.css";

const Comment = ({ comment, comments, setComments }) => {
  const [showBtns, setShowBtns] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id, owner, text } = comment;
  const { id: currentUserId } = useSelector(state => state.currentUser);
  const btnToFocus = useRef();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(id);
      setComments(
        comments.filter(comment => {
          return comment.id !== id;
        })
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleEditComment = async text => {
    try {
      const { data: editedComment } = await editComment(id, text);
      setComments(
        comments.map(cmm => {
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

  useEffect(() => {
    if (showBtns && btnToFocus.current) btnToFocus.current.focus();
  }, [showBtns, btnToFocus]);

  return (
    <li
      className="comment"
      onMouseLeave={() => {
        setShowBtns(false);
      }}
      onClick={() => {
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
                onKeyUp={e => {
                  if (e.key === "Enter") {
                    setShowBtns(!showBtns);
                  }
                }}
                tabIndex="0"
              >
                <Settings />
              </div>
              <div className={showBtns ? "btns" : "btns hidden"}>
                <button
                  ref={btnToFocus}
                  className="edit"
                  disabled={!showBtns ? true : false}
                  onClick={() => {
                    setShowEditModal(true);
                    setShowBtns(false);
                  }}
                >
                  edit
                </button>
                <button
                  className="delete"
                  disabled={!showBtns ? true : false}
                  onClick={handleDeleteComment}
                >
                  delete
                </button>
              </div>
            </>
          )}
        </div>
        {comment.isEdited && <span className="edited"> edited</span>}
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
      // setUpdate(true);
    }, 20000);

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
            <span className="comment_text">
              <Link to={"/users/" + postOwner.id} className="comment_user_ref">
                {postOwner.login}
              </Link>
              {" " + postTitle}
            </span>
          </li>
          {comments.map(comment => {
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
