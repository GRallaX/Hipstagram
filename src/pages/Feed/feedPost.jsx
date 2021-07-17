import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getPostById } from "../../api/posts";
import { getUserById } from "../../api/users";

import { LikeButton } from "../../components/likeBtn";
import { LikeHeart } from "../../components/likeHeart";
import { PostLikes } from "../../components/postLikesInfo";
import { PostComments } from "../../containers/postComments";
import { CommentBtn } from "../../images/commentBtn.js";
import { ModalLikes } from "../../containers/dialogues/modalLikes";
import { AddComment } from "../../components/addComment";
import { FollowButton } from "../../components/followBtn";

import { Avatar } from "../../components/avatar";
import { LoadingIconBig } from "../../components/loadingIcon";

export const FeedPost = ({ post: postProp, modalPost, setModalPost }) => {
  const [post, setPost] = useState(postProp);
  const { ownerId, imgUrl, title, _id } = post;

  const [likes, setLikes] = useState(postProp.likes);
  const [postOwner, setPostOwner] = useState(false);
  const [comments, setComments] = useState(false);
  const [modalLikes, setModalLikes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const currentUser = useSelector(state => state.currentUser);
  const { id: currentUserId } = currentUser;

  const [isLiked, setIsLiked] = useState(
    likes.some(user => user._id === currentUserId)
  );

  const modalPostOpened = useMemo(() => {
    if (modalPost?._id === _id) {
      return true;
    } else {
      return false;
    }
  }, [_id, modalPost?._id]);

  useEffect(() => {
    if (modalPostOpened) {
      setPost(modalPost);
      setComments(modalPost.comments);
      setLikes(modalPost.likes);
      setIsLiked(modalPost.likes.some(user => user._id === currentUserId));
      setModalPost(false);
    }
  }, [currentUserId, modalPost, modalPostOpened, setModalPost]);

  useEffect(() => {
    let cleanupFunction = false;

    const interval = setInterval(() => {
      // setUpdate(true);
    }, 20000);

    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        const { data: fetchedPost } = await getPostById(_id);
        if (!cleanupFunction) {
          setPost(fetchedPost);
          setLikes(fetchedPost.likes);
          setIsLiked(
            fetchedPost.likes.some(user => user._id === currentUserId)
          );
          setPostOwner(owner);
          setIsLoading(false);
          setUpdate(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
    return () => {
      cleanupFunction = true;
      clearInterval(interval);
    };
  }, [_id, ownerId, currentUserId, postProp, update]);

  if (isLoading) {
    return (
      <article className="feed_post">
        <LoadingIconBig />
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
          {postOwner.id === currentUserId && (
            <div className="edit_btn_container">
              <FollowButton post={post} user={postOwner} size="small_btn" />
            </div>
          )}
        </header>
        <div className={imgLoading ? "image loading" : "image"}>
          <img
            src={imgUrl}
            alt={"post_img_" + _id}
            onLoad={() => setImgLoading(false)}
            onError={e => (e.target.src = "https://picsum.photos/600/400/")}
          />
          <LikeHeart
            post={post}
            likes={likes}
            setLikes={setLikes}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            currentUser={{
              _id: currentUser.id,
              login: currentUser.login,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              avatar: currentUser.avatar,
            }}
          />
        </div>
        <div className="feed_post_btns">
          <LikeButton
            post={post}
            likes={likes}
            setLikes={setLikes}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            currentUser={{
              _id: currentUser.id,
              login: currentUser.login,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              avatar: currentUser.avatar,
            }}
          />
          <Link
            to={{
              pathname: "/feed/p/" + _id,
              state: { post, comments, postOwner, likes },
            }}
          >
            <span className="comment_btn_container">
              <CommentBtn />
            </span>
          </Link>
          <PostLikes likes={likes} setModalLikes={setModalLikes} />
        </div>
        <PostComments
          postId={_id}
          postTitle={title}
          postOwner={postOwner}
          comments={comments}
          setComments={setComments}
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
