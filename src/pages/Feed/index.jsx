import { useEffect, useState } from "react";
import "./feed.css";

import { fetchFeed } from "../../api/posts";
import { FeedPost } from "../../containers/feedPost";

import loadingIcon from "../../images/loading_big.svg";

export const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const updateFeed = (cleanupFunction = false) => {
    (async () => {
      try {
        const { data: feed } = await fetchFeed();
        if (!cleanupFunction) {
          setPosts(feed);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
  };

  useEffect(() => {
    document.title = "Feed";
    let cleanupFunction = false;
    const interval = setInterval(() => {
      updateFeed(cleanupFunction);
    }, 10000);
    return () => {
      cleanupFunction = true;
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="main">
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </div>
    );
  } else if (!isLoading && !posts.length) {
    return (
      <div className="main">
        <h2>No posts yet</h2>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="feed_posts">
          {posts.map((post) => {
            return (
              <FeedPost
                key={"post_" + post._id}
                post={post}
                updateFeed={updateFeed}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
