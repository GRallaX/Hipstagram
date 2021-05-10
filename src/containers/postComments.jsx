import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/avatar";

import { fetchPostComments } from "../api/comments";
import loadingIcon from "../images/loading_small.svg";

const Comment = ({ comment }) => {
  const { owner } = comment;
  return (
    <li className="post_comment">
      <Link to={"/users/" + owner.id} className="user_comment_ref">
        <Avatar avatar={owner.avatar} size="very_small" />
        {owner.login}
      </Link>
      <p>{comment.text}</p>
    </li>
  );
};

export const PostComments = ({ postId }) => {
  const [comments, setComments] = useState();
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
        console.log(e.response.data);
      }
    })();
    return () => (cleanupFunction = true);
  }, [postId]);

  if (isLoading) {
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
          {comments.map((comment) => {
            return <Comment key={"comment_" + comment.id} comment={comment} />;
          })}
        </ul>
        <div className="add_comment">Add comment</div>
      </div>
    );
  }
};
