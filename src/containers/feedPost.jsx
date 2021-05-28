import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "../components/avatar";
import { LikeButton } from "../components/likeBtn";
import { LikeHeart } from "../components/likeHeart";
import { PostLikes } from "../components/postLikesInfo";
import { PostComments } from "./feedComments";
import { getUserById } from "../api/users";

import loadingIcon from "../images/loading_big.svg";
import { CommentBtn } from "../images/commentBtn.js";

export const FeedPost = ({
  post,
  post: { ownerId, imgUrl, title, _id, likes },
  updateFeed,
}) => {
  const [postOwner, setPostOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [modalLikes, setModalLikes] = useState(null);

  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((user) => user._id === currentUserId) ? true : false
  );

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
              : { minHeight: "unset", animationName: "none" }
          }
        >
          <img
            src={imgUrl}
            alt={"post_image" + imgUrl}
            onLoad={() => setImgLoading(false)}
          />
          <LikeHeart
            post={post}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            updateFeed={updateFeed}
          />
        </div>
        <div className="feed_post_btns">
          <LikeButton
            likes={likes}
            postId={_id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            updateFeed={updateFeed}
          />
          <Link to={{ pathname: "/feed/p/" + _id, state: { post } }}>
            <span className="comment_btn_container">
              <CommentBtn />
            </span>
          </Link>
          <PostLikes likes={likes} setModalLikes={setModalLikes} />
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
