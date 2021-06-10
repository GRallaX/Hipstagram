import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { LikeButton } from "../components/likeBtn";
import { LikeHeart } from "../components/likeHeart";
import { PostLikes } from "../components/postLikesInfo";
import { FeedComments } from "./feedComments";
import { CommentBtn } from "../images/commentBtn.js";
import { ModalLikes } from "./smallModals/modalLikes";

import { Avatar } from "../components/avatar";
import { getUserById } from "../api/users";
import loadingIcon from "../images/loading_big.svg";

export const FeedPost = ({
  post,
  post: { ownerId, imgUrl, title, _id, likes },
  updateFeed,
}) => {
  const [postOwner, setPostOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [modalLikes, setModalLikes] = useState(false);

  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        if (!cleanupFunction) {
          setIsLiked(
            likes.some((user) => user._id === currentUserId) ? true : false
          );
          setPostOwner(owner);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id, ownerId, likes, currentUserId]);

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
        {modalLikes && (
          <ModalLikes usersList={likes} setModalLikes={setModalLikes} />
        )}
        <header className="feed_post_header">
          <Link to={"/users/" + ownerId} className="user_post_ref">
            <Avatar avatar={postOwner.avatar} size="small" />
          </Link>
          <Link to={"/users/" + ownerId} className="user_post_ref">
            {postOwner.login}
          </Link>
        </header>
        <div className={imgLoading ? "image loading" : "image"}>
          <img
            src={imgUrl}
            alt={"post_img_" + _id}
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
          <Link
            to={{
              pathname: "/feed/p/" + _id,
              state: { post, postOwner },
            }}
          >
            <span className="comment_btn_container">
              <CommentBtn />
            </span>
          </Link>
          <PostLikes likes={likes} setModalLikes={setModalLikes} />
        </div>
        <FeedComments postId={_id} postTitle={title} postOwner={postOwner} />
      </article>
    );
  }
};
