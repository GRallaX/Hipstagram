import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { Avatar } from "../components/avatar";
import { LikeButton } from "../components/likeBtn";
import { PostComments } from "./feedComments";
import { getUserById } from "../api/users";

import loadingIcon from "../images/loading_big.svg";
import { commentBtn } from "../images/commentBtn.js";

export const FeedPost = ({
  post,
  post: { ownerId, imgUrl, title, _id, likes },
}) => {
  const [postOwner, setPostOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        if (!cleanupFunction) {
          setPostOwner(owner);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id, ownerId]);
  if (isLoading) {
    return (
      <article className="feed_post">
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </article>
    );
  } else {
    return (
      <article className="feed_post">
        <header className="feed_post_header">
          <Link to={"/users/" + ownerId} className="user_post_ref">
            <Avatar avatar={postOwner.avatar} size="small" />
            {postOwner.login}
          </Link>
        </header>
        <div
          className="image"
          style={
            imgLoading
              ? window.innerWidth > 600
                ? { minHeight: "400px" }
                : { minHeight: "calc(100vw/1.5)" }
              : { minHeight: "unset" }
          }
        >
          <img
            src={imgUrl}
            alt={"post_image" + imgUrl}
            onClick={() => history.push("/feed/post/" + _id, { post })}
            onLoad={() => setImgLoading(false)}
          />
        </div>
        <div className="feed_post_btns">
          <LikeButton likes={likes} postId={_id} />
          <span
            className="comment_btn"
            onClick={() => history.push("/feed/post/" + _id, { post })}
          >
            {commentBtn}
          </span>
          <div className="feed_post_likes"></div>
        </div>
        <div className="feed_owner_comment">
          <span className="feed_comment">
            <Link to={"/users/" + ownerId} className="feed_user_ref">
              {postOwner.login}
            </Link>
            {title}
          </span>
        </div>
        <PostComments postId={_id} />
      </article>
    );
  }
};
