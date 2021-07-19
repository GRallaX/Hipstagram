import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { fetchPostComments } from "../../api/comments";
import { LikeBtnLiked } from "../../images/heartBtn.js";
import { CommentBtnFilled } from "../../images/commentBtn";
import { toast } from "react-toastify";

export const UsersPost = ({
  post: postProp,
  postOwner,
  modalPost,
  setModalPost,
  arrOfPosts,
}) => {
  const [comments, setComments] = useState([]);
  const [imgLoading, setImgLoading] = useState(true);
  const [post, setPost] = useState(postProp);

  const { _id, imgUrl, likes, title, ownerId } = post;
  const { ownersLogin } = postOwner;
  const location = useLocation();

  const modalPostOpened = useMemo(() => {
    if (modalPost?._id === _id) {
      return true;
    } else {
      return false;
    }
  }, [_id, modalPost?._id]);

  useEffect(() => {
    if (modalPostOpened) {
      if (modalPost) setPost(modalPost);
      if (modalPost.comments) setComments(modalPost.comments);
      setModalPost(false);
    }
  }, [modalPost, modalPostOpened, setModalPost]);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: comments } = await fetchPostComments(_id);
        if (!cleanupFunction) {
          setComments(comments);
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id]);

  return (
    <Link
      to={{
        pathname: "/users/" + ownerId + "/p/" + _id,
        state: {
          ...location.state,
          post,
          comments,
          postOwner,
          likes,
          arrOfPosts,
        },
      }}
    >
      <div className={imgLoading ? "user_post loading" : "user_post"}>
        <img
          onLoad={() => {
            setImgLoading(false);
          }}
          onError={e => (e.target.src = "https://picsum.photos/500/")}
          src={imgUrl}
          alt={ownersLogin + " " + title}
        />
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
