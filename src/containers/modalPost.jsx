import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { getPostById } from "../api/posts";
import { ModalWindow } from "../components/modalWindow";
import loadingIcon from "../images/loading_big.svg";

export const ModalPost = () => {
  const [post, setPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { pathname } = useLocation();
  const { postId } = useParams();

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
          <p>{post.title}</p>
        </div>
      </ModalWindow>
    );
  }
};
