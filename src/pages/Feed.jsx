import { useEffect, useState } from "react";
import { fetchFeed } from "../api/posts";
import loadingIcon from "../images/loading_big.svg";

export const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: feed } = await fetchFeed();
      setPosts(feed);
      setIsLoading(false);
    })();
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
        <h2>Feed</h2>
        <div></div>
      </main>
    );
  }
};
