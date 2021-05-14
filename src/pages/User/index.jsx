import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "../../components/avatar";
import { FollowButton } from "../../components/followBtn";
import { getUserById } from "../../api/users";
import { UsersPost } from "../../components/usersPost";

import loadingIcon from "../../images/loading_big.svg";

import "./user.css";

export const User = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);
  const { id: currentUserId, token } = currentUser;

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      if (pageUserId === currentUserId) {
        if (!cleanupFunction) {
          setUser({ ...currentUser });
          setIsLoading(false);
        }
        document.title = "Hipstagram - My Profile";
      } else {
        try {
          const { data: fetchedUser } = await getUserById(pageUserId);
          if (!cleanupFunction) {
            console.info(fetchedUser);
            setUser({ ...fetchedUser });
            setIsLoading(false);
          }
          document.title = fetchedUser.login;
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    })();

    return () => (cleanupFunction = true);
  }, [pageUserId, currentUser, token, currentUserId]);

  if (isLoading) {
    return (
      <div className="main">
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </div>
    );
  } else if (!isLoading && !Object.keys(user).length) {
    return (
      <div className="main">
        <h2>No such User</h2>
      </div>
    );
  } else {
    const {
      login,
      avatar,
      id,
      email,
      firstName,
      lastName,
      posts,
      followersCount,
      followingsCount,
    } = user;

    return (
      <div className="main">
        <header className="user_header">
          <Avatar avatar={avatar} size="big" />
          <section className="user_info">
            <h1>{login}</h1>
            <FollowButton userId={id} size="big_btn" />
            <ul className="user_data">
              <li>
                <span className="data">{posts.length}</span>
                <span className="data_type"> posts</span>
              </li>
              <li>
                <span className="data">{followersCount}</span>
                <span className="data_type"> followers</span>
              </li>
              <li>
                <span className="data">{followingsCount}</span>
                <span className="data_type"> following</span>
              </li>
            </ul>
            {(!!firstName || !!lastName) && (
              <h3>{firstName + " " + lastName}</h3>
            )}
            {!!email && <span>{email}</span>}
          </section>
        </header>
        <article className="user_posts">
          <div className="posts_wrapper">
            {posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <UsersPost
                    key={"post_" + post._id}
                    post={post}
                    ownersLogin={login}
                  />
                );
              })
            ) : (
              <h2>No posts yet</h2>
            )}
          </div>
        </article>
      </div>
    );
  }
};
