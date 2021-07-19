import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteComment, editComment } from "../../api/comments";

import { EditingTextModal } from "../dialogues/editingText";
import { ReactComponent as Settings } from "../../images/settings_icon.svg";
import { toast } from "react-toastify";

const countTimeInfo = time => {
  let date = new Date(time);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  let diff = new Date().getTime() - date.getTime();

  if (diff < 1000) {
    return "right now";
  }

  let sec = Math.floor(diff / 1000);

  if (sec === 1) {
    return "1 second ago";
  }

  if (sec < 60) {
    return sec + " seconds ago";
  }

  let min = Math.floor(diff / 60 / 1000);
  if (min === 1) {
    return "1 minute ago";
  }
  if (min < 60) {
    return min + " minutes ago";
  }

  let hour = Math.floor(diff / 60 / 60 / 1000);
  if (hour === 1) {
    return "1 hour ago";
  }
  if (hour < 24) {
    return hour + " hours ago";
  }

  let day = Math.floor(diff / 24 / 60 / 60 / 1000);
  if (day === 1) {
    return "1 day ago";
  }
  if (day < 7) {
    return day + " days ago";
  }

  let week = Math.floor(diff / 7 / 24 / 60 / 60 / 1000);
  if (week === 1) {
    return "1 week ago";
  }
  if (week < 4) {
    return week + " weeks ago";
  }

  let mon = Math.floor(diff / 5 / 7 / 24 / 60 / 60 / 1000);
  if (mon === 1) {
    return "1 month ago";
  }

  return mon + " month ago";
};

export const Comment = ({ comment, comments, setComments, showTime }) => {
  const [showBtns, setShowBtns] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id, owner, text, createAt, isEdited } = comment;
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
    } catch (e) {
      toast.error(e.response?.data || e.message);
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
    } catch (e) {
      toast.error(e.response?.data || e.message);
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
      </div>
      <div className="comment_status">
        {showTime && <span className="time">{countTimeInfo(createAt)}</span>}
        {isEdited && <span className="edited"> edited</span>}
      </div>
    </li>
  );
};
