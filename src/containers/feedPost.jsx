import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { Avatar } from "../components/avatar";
import { LikesAndComments } from "../components/likesAndComments";
import { PostComments } from "./postComments";
import { getUserById } from "../api/users";
import loadingIcon from "../images/loading_big.svg";

export const FeedPost = ({
  post: { ownerId, imageUrl, title, _id, likes },
}) => {
  const [postOwner, setPostOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: owner } = await getUserById(ownerId);
        if (!cleanupFunction) {
          setPostOwner(owner);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.response);
      }
    })();
    return () => (cleanupFunction = true);
  }, [_id, ownerId]);
  if (isLoading) {
    return (
      <li className="feed_post">
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </li>
    );
  } else {
    return (
      <li className="feed_post">
        <div className="header">
          <Link to={"/users/" + ownerId} className="user_post_ref">
            <Avatar avatar={postOwner.avatar} size="small" />
            {postOwner.login}
          </Link>
        </div>
        <div className="image">
          <img
            src={imageUrl}
            alt={"post_image_" + _id}
            onClick={() => history.push("/feed/post/" + _id)}
          />
        </div>

        <Link to={"/users/" + ownerId} className="user_post_title_ref">
          {postOwner.login}
        </Link>
        <p>{title}</p>
        <LikesAndComments likes={likes} postId={_id} />
        <PostComments postId={_id} />
      </li>
    );
  }
};
