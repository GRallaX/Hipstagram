import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Avatar } from "./avatar";
import { LikesAndComments } from "./likesAndComments";
import { PostComment } from "./postComment";
import { getUserById } from "../api/users";
import { fetchPostComments } from "../api/comments";
import loadingIcon from "../images/loading_big.svg";

export const FeedPost = ({
  post: { ownerId, imageUrl, title, _id, likes },
}) => {
  const [postOwner, setPostOwner] = useState();
  const [postComments, setPostComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        const { data: comments } = await fetchPostComments(_id);
        if (!cleanupFunction) {
          setPostOwner(owner);
          setPostComments(comments);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id, ownerId]);
  if (isLoading) {
    return (
      <li className="feed_post">
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </li>
    );
  } else {
    return (
      <li className="feed_post">
        <div className="header">
          <Link to={"/users/" + ownerId} className="user_post_ref">
            <Avatar avatar={postOwner.avatar} size="small" />
            {postOwner.login}
          </Link>
        </div>
        <div className="image">
          <img src={imageUrl} alt={"image " + _id} />
        </div>

        <Link to={"/users/" + ownerId} className="user_post_title_ref">
          {postOwner.login}
        </Link>
        <p>{title}</p>
        <div className="likes">
          <LikesAndComments likes={likes} />
        </div>
        <ul className="comments">
          {postComments.map((comment) => {
            return (
              <PostComment
                key={"comment_" + comment.id}
                postId={_id}
                id={comment.id}
                owner={comment.owner}
                text={comment.text}
                isEdited={comment.isEdited}
              />
            );
          })}
        </ul>
        <div className="add_comment">Add comment</div>
      </li>
    );
  }
};
