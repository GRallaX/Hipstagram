import { useEffect, useState } from "react";
import "./feed.css";

import { fetchFeed } from "../../api/posts";
import { FeedPost } from "../../containers/feedPost";

import loadingIcon from "../../images/loading_big.svg";

export const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Hipstagram - Feed";
    let cleanupFunction = false;
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
    return () => (cleanupFunction = true);
  }, []);

  if (isLoading) {
    return (
      <main>
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </main>
    );
  } else if (!isLoading && !posts.length) {
    return (
      <main>
        <h2>No posts yet</h2>
      </main>
    );
  } else {
    return (
      <main>
        <div className="feed_posts">
          {posts.map((post) => {
            return <FeedPost key={"post_" + post._id} post={post} />;
          })}
        </div>
      </main>
    );
  }
};
