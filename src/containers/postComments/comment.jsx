import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteComment, editComment } from "../../api/comments";

import { EditingTextModal } from "../dialogues/editingText";
import { timeFormat } from "./timeFormat";
import { toast } from "react-toastify";
import { ReactComponent as Settings } from "../../images/settings_icon.svg";

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
        {showTime && <span className="time">{timeFormat(createAt)}</span>}
        {isEdited && <span className="edited"> edited</span>}
      </div>
    </li>
  );
};
