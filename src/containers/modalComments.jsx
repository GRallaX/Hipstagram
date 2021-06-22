import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import loadingIcon from "../images/loading_small.svg";

const Comment = ({ comment }) => {
  const { owner } = comment;
  return (
    <li className="feed_comment">
      <span>
        <Link to={"/users/" + owner.id} className="feed_user_ref">
          {owner.login}
        </Link>
        {comment.text}
      </span>
    </li>
  );
};

export const ModalComments = ({
  postOwner,
  postTitle,
  comments,
  updateComments,
}) => {
  const [isLoading, setIsLoading] = useState(comments ? false : true);

  useEffect(() => {
    let cleanupFunction = false;
    updateComments(cleanupFunction, setIsLoading);
    return () => (cleanupFunction = true);
  }, [updateComments]);

  if (isLoading || !comments) {
    return (
      <div className="modal_comments_container">
        <div className="loading_comments">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal_comments_container">
        <ul className="comments">
          <li className="feed_comment owner">
            <span>
              <Link to={"/users/" + postOwner.id} className="feed_user_ref">
                {postOwner.login}
              </Link>
              {postTitle}
            </span>
          </li>
          {comments.map((comment) => {
            return <Comment key={"comment_" + comment.id} comment={comment} />;
          })}
        </ul>
      </div>
    );
  }
};
