import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import { FollowButton } from "../../components/followBtn";
import { ModalWindow } from "../../components/modalWindow";
import { ModalComments } from "../modalComments";
import { LikeButton } from "../../components/likeBtn";
import { LikeHeart } from "../../components/likeHeart";
import { PostLikes } from "../../components/postLikesInfo";
import { ModalLikes } from "../smallModals/modalLikes";

import { getPostById } from "../../api/posts";
import { getUserById } from "../../api/users";
import { Avatar } from "../../components/avatar";

import loadingIcon from "../../images/loading_big.svg";
import "./modalPost.css";

export const ModalPost = ({ updateFeed }) => {
  const location = useLocation();
  const history = useHistory();
  const { postId } = useParams();

  const [postOwner, setPostOwner] = useState(location.state.postOwner || false);
  const [post, setPost] = useState(location.state.post || false);
  const [isLoading, setIsLoading] = useState(post && postOwner ? false : true);

  const { ownerId, likes, title, imgUrl } = post;

  const [modalLikes, setModalLikes] = useState(false);

  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((user) => user._id === currentUserId) ? true : false
  );

  const postContainer = useRef();

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: fetchedPost } = await getPostById(postId);
        const { data: fetchedUser } = await getUserById(fetchedPost.ownerId);
        if (!cleanupFunction) {
          setPost(fetchedPost);
          setPostOwner(fetchedUser);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
        if (!cleanupFunction) {
          setIsLoading(false);
        }
      }
    })();
    return () => (cleanupFunction = true);
  }, [postId, ownerId]);

  if (isLoading) {
    return (
      <ModalWindow closeModalFunc={() => history.goBack()}>
        <div className="modal_post">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !post) {
    return (
      <ModalWindow closeModalFunc={() => history.goBack()}>
        <div className="modal_post">
          <h2>No post found</h2>
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !!post) {
    return (
      <ModalWindow closeModalFunc={() => history.goBack()}>
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
            </header>
            <div className="modal_post_image">
              <img onLoad={() => {}} src={imgUrl} alt={imgUrl} />
            </div>

            <ModalComments
              postId={postId}
              postTitle={title}
              postOwner={postOwner}
            />
            <div className="modal_post_btns">
              <LikeButton
                likes={likes}
                postId={postId}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                updateFeed={updateFeed}
              />
              <PostLikes likes={likes} setModalLikes={setModalLikes} />
            </div>
          </article>
        </div>
      </ModalWindow>
    );
  }
};
