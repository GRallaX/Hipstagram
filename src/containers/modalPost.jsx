import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { getPostById } from "../api/posts";
import { ModalWindow } from "../components/modalWindow";
import loadingIcon from "../images/loading_big.svg";

export const ModalPost = () => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = useLocation();
  const { postId } = useParams();

  const [post, setPost] = useState(
    !location.state?.post ? false : location.state.post
  );
  const [isLoading, setIsLoading] = useState(
    !location.state?.post ? true : false
  );

  const loadingImg = useRef();
  const postContainer = useRef();

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: fetchedPost } = await getPostById(postId);
        if (!cleanupFunction) {
          setPost(fetchedPost);
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
  }, [postId]);

  if (isLoading) {
    return (
      <ModalWindow
        closeModalFunc={() =>
          history.push(pathname.substring(0, pathname.search(/post/g)))
        }
      >
        <div className="modal_post">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !post) {
    return (
      <ModalWindow
        closeModalFunc={() =>
          history.push(pathname.substring(0, pathname.search(/post/g)))
        }
      >
        <div className="modal_post">
          <h2>No post found</h2>
        </div>
      </ModalWindow>
    );
  } else if (!isLoading && !!post) {
    return (
      <ModalWindow
        closeModalFunc={() =>
          history.push(pathname.substring(0, pathname.search(/post/g)))
        }
      >
        <div className="modal_post">
          <img src={loadingIcon} alt="loadingIcon" ref={loadingImg} />
          <article
            ref={postContainer}
            className="post"
            style={{ display: "none" }}
          >
            <div className="modal_post_image">
              <img
                onLoad={() => {
                  postContainer.current.style.display = "initial";
                  loadingImg.current.style.display = "none";
                }}
                src={post.imgUrl}
                alt={"post_image " + post.imgUrl}
              />
            </div>
            <p>{post.title}</p>
          </article>
        </div>
      </ModalWindow>
    );
  }
};
