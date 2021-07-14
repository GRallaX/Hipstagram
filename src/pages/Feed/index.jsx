import { Route } from "react-router";
import { useEffect, useRef, useState } from "react";
import { fetchFeed } from "../../api/posts";

import { FeedPost } from "./feedPost";
import { ModalPost } from "../../containers/modalPost";
import { LoadingIconBig } from "../../components/loadingIcon";
import "./feed.css";

export const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsForRender, setPostsForRender] = useState([]);
  const [modalPost, setModalPost] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);

  const feedContainer = useRef();

  const feedScrollListener = () => {
    if (
      document.documentElement.clientHeight + 200 >
      feedContainer.current?.getBoundingClientRect().bottom
    ) {
      setEndOfPage(true);
    }
  };

  useEffect(() => {
    if (posts.length > postsForRender.length) {
      document.addEventListener("scroll", feedScrollListener, true);
      return () => document.removeEventListener("scroll", feedScrollListener);
    }
  }, [posts, postsForRender]);

  useEffect(() => {
    if (
      posts.length > postsForRender.length &&
      (endOfPage ||
        !postsForRender.length ||
        feedContainer.current?.clientHeight < window.innerHeight)
    ) {
      const postForRender = posts[postsForRender.length];
      setPostsForRender([...postsForRender, postForRender]);
      setEndOfPage(false);
    }
  }, [endOfPage, posts, postsForRender]);

  useEffect(() => {
    document.title = "Feed";
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: feed } = await fetchFeed();
        if (!cleanupFunction) {
          setPosts([...feed]);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
    return () => {
      cleanupFunction = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="main">
        <LoadingIconBig />
      </div>
    );
  } else if (!isLoading && !postsForRender.length) {
    return (
      <div className="main">
        <div className="empty">
          <h2>No posts yet</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <Route
          path="/feed/p/:postId"
          render={() => <ModalPost setModalPost={setModalPost} />}
        />
        <div className="feed_posts" ref={feedContainer}>
          {postsForRender.map(post => {
            return (
              <FeedPost
                key={"post_" + post._id}
                post={post}
                modalPost={modalPost}
                setModalPost={setModalPost}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
