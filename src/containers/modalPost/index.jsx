import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getPostById } from "../../api/posts";
import { getUserById } from "../../api/users";

import { FollowButton } from "../../components/followBtn";
import { ModalWindow } from "../../components/modalWindow";
import { PostComments } from "../postComments";
import { LikeButton } from "../../components/likeBtn";
import { LikeHeart } from "../../components/likeHeart";
import { PostLikes } from "../../components/postLikesInfo";
import { ModalLikes } from "../dialogues/modalLikes";
import { AddComment } from "../../components/addComment";

import { Avatar } from "../../components/avatar";
import { LoadingIconBig } from "../../components/loadingIcon";

import "./modalPost.css";

export const ModalPost = ({ setModalPost }) => {
  const location = useLocation();
  const history = useHistory();
  const { postId } = useParams();

  const [post, setPost] = useState(location.state?.post || false);
  const { _id, ownerId, title, imgUrl } = post;

  const [postOwner, setPostOwner] = useState(
    location.state?.postOwner || false
  );

  const currentUser = useSelector(state => state.currentUser);
  const { id: currentUserId } = currentUser;

  const [likes, setLikes] = useState(location.state?.likes || []);
  const [comments, setComments] = useState(location.state?.comments || false);
  const [isLoading, setIsLoading] = useState(post && postOwner ? false : true);
  const [modalLikes, setModalLikes] = useState(false);
  const [isLiked, setIsLiked] = useState(
    likes?.some(user => user._id === currentUserId)
  );
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    return () => {
      if (setModalPost) {
        setModalPost({ ...post, likes: likes, comments: comments });
      }
    };
  }, [likes, post, setModalPost, comments]);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: fetchedPost } = await getPostById(postId);
        const { data: fetchedUser } = await getUserById(fetchedPost.ownerId);
        if (!cleanupFunction) {
          setPost({ ...fetchedPost });
          setLikes([...fetchedPost.likes]);
          setIsLiked(
            fetchedPost.likes.some(user => user._id === currentUserId)
          );
          setPostOwner({ ...fetchedUser });
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
        if (!cleanupFunction) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cleanupFunction = true;
    };
  }, [currentUserId, postId]);

  if (isLoading) {
    return (
      <ModalWindow
        closeModalFunc={() => history.push(location.pathname.split("/p/")[0])}
      >
        <div className="modal_post">
          <LoadingIconBig />
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !post) {
    return (
      <ModalWindow
        closeModalFunc={() => history.push(location.pathname.split("/p/")[0])}
      >
        <div className="modal_post">
          <h2 className="no_post_found">No post found</h2>
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !!post) {
    return (
      <ModalWindow
        closeModalFunc={() => history.push(location.pathname.split("/p/")[0])}
      >
        <div className="modal_post_wrapper">
          <article className="modal_post">
            {modalLikes && (
              <ModalLikes usersList={likes} setModalLikes={setModalLikes} />
            )}
            <header className="modal_post_header">
              <Link to={"/users/" + ownerId} className="user_ref">
                <Avatar avatar={postOwner.avatar} size="small" />
              </Link>
              <Link to={"/users/" + ownerId} className="user_ref">
                {postOwner.login}
              </Link>
              <div className="subscribe_btn">
                <FollowButton
                  user={postOwner}
                  setUser={setPostOwner}
                  size="small_btn"
                />
              </div>
            </header>
            <div
              className={
                imgLoading ? "modal_post_image loading" : "modal_post_image"
              }
            >
              <img
                onLoad={() => {
                  setImgLoading(false);
                }}
                src="https://sample-videos.com/img/Sample-png-image-500kb.png"
                alt={imgUrl}
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
            <div className="comments_likes_container">
              <PostComments
                postId={_id}
                postTitle={title}
                postOwner={postOwner}
                comments={comments}
                setComments={setComments}
              />
              <div className="modal_post_btns">
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
                <PostLikes likes={likes} setModalLikes={setModalLikes} />
              </div>
              <AddComment
                postId={postId}
                comments={comments}
                setComments={setComments}
              />
            </div>
          </article>
        </div>
      </ModalWindow>
    );
  }
};
