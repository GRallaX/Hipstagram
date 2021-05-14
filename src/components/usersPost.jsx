import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchPostComments } from "../api/comments";
import { LikeBtnLiked } from "../images/heartBtn.js";
import { CommentBtnFilled } from "../images/commentBtn";

export const UsersPost = ({ post, ownersLogin }) => {
  const [comments, setComments] = useState([]);

  const { _id, imgUrl, likes, title, ownerId } = post;

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: comments } = await fetchPostComments(_id);
        if (!cleanupFunction) {
          setComments(comments);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id]);

  return (
    <Link to={{ pathname: "/users/" + ownerId + "/p/" + _id, state: { post } }}>
      <div className="user_post">
        <img src={imgUrl} alt={ownersLogin + " " + title} />
        <div className="interactions_container">
          <div className="interactions">
            <span>
              <LikeBtnLiked />
              {likes.length}
            </span>
            <span>
              <CommentBtnFilled />
              {comments.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
