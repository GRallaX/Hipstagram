import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPostById } from "../api/posts";
import { fetchPostComments } from "../api/comments";
import { getUserById } from "../api/users";

import { LikeButton } from "../components/likeBtn";
import { LikeHeart } from "../components/likeHeart";
import { PostLikes } from "../components/postLikesInfo";
import { FeedComments } from "./feedComments";
import { CommentBtn } from "../images/commentBtn.js";
import { ModalLikes } from "./smallModals/modalLikes";
import { AddComment } from "../components/addComment";

import { Avatar } from "../components/avatar";
import loadingIcon from "../images/loading_big.svg";

export const FeedPost = ({ post: postProp }) => {
  const [post, setPost] = useState(postProp);
  const { ownerId, imgUrl, title, _id, likes } = post;

  const [postOwner, setPostOwner] = useState(false);
  const [comments, setComments] = useState(false);
  const [modalLikes, setModalLikes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((user) => user._id === currentUserId)
  );

  const location = useLocation();

  const updatePost = useCallback(
    async (cleanupFunction) => {
      try {
        const { data: fetchedPost } = await getPostById(_id);
        if (!cleanupFunction) {
          setPost({ ...fetchedPost });
          setIsLiked(
            fetchedPost.likes.some((user) => user._id === currentUserId)
          );
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
        if (!cleanupFunction) {
          setIsLoading(false);
        }
      }
    },
    [_id, currentUserId]
  );

  const updateComments = useCallback(
    async (cleanupFunction, setLoading) => {
      try {
        const { data: comments } = await fetchPostComments(_id);
        if (!cleanupFunction) {
          setComments(comments);
          setLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    [_id]
  );

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        await updatePost(cleanupFunction);
        if (!cleanupFunction) {
          setPostOwner(owner);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id, ownerId, currentUserId, updatePost, postProp, location]);

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
            updatePost={updatePost}
          />
        </div>
        <div className="feed_post_btns">
          <LikeButton
            likes={likes}
            postId={_id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            updatePost={updatePost}
          />
          <Link
            to={{
              pathname: "/feed/p/" + _id,
              state: { post, comments, postOwner },
            }}
          >
            <span className="comment_btn_container">
              <CommentBtn />
            </span>
          </Link>
          <PostLikes likes={likes} setModalLikes={setModalLikes} />
        </div>
        <FeedComments
          postTitle={title}
          postOwner={postOwner}
          comments={comments}
          updateComments={updateComments}
        />
        <AddComment
          postId={_id}
          comments={comments}
          setComments={setComments}
        />
      </article>
    );
  }
};
