import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchPostComments } from "../api/comments";

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

export const FeedComments = ({
  postId,
  postTitle,
  postOwner,
  comments,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
  }, [postId, setComments, location]);

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
