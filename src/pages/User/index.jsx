import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import LazyLoad from "react-lazyload";

import { ModalPost } from "../../containers/modalPost";
import { ModalFollowers } from "../../containers/dialogues/modalFollowers";
import { ModalFollowings } from "../../containers/dialogues/modalFollowings";
import { UsersPost } from "../../components/usersPost";
import { Avatar } from "../../components/avatar";
import { FollowButton } from "../../components/followBtn";

import { getUserById } from "../../api/users";
import { getFollowersAndFollowings } from "../../api/users";

import { LoadingIconBig } from "../../components/loadingIcon";
import "./user.css";
import { getCurrentUser } from "../../store/currentUser/thunks";

export const User = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalFollowers, setModalFollowers] = useState(false);
  const [modalFollowings, setModalFollowings] = useState(false);
  const [modalPost, setModalPost] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { id: currentUserId, token } = currentUser;

  useEffect(() => {
    if (pageUserId === currentUserId) dispatch(getCurrentUser());
  }, [dispatch, currentUserId, pageUserId]);

  useEffect(() => {
    setModalFollowers(false);
    setModalFollowings(false);
  }, [location]);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      if (pageUserId === currentUserId) {
        if (!cleanupFunction) {
          setUser({
            ...currentUser,
            followersCount: currentUser.followers.length,
            followingsCount: currentUser.following.length,
          });
          setIsLoading(false);
        }
        document.title = "Hipstagram - My Profile";
      } else {
        try {
          const { data: fetchedUser } = await getUserById(pageUserId);
          const { data: followersAndFollowings } =
            await getFollowersAndFollowings(pageUserId);

          if (!cleanupFunction) {
            setUser({ ...fetchedUser, ...followersAndFollowings });
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
        <LoadingIconBig />
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
      followers,
      following,
    } = user;

    const reducer = (accum, post) => {
      if (!accum.length || accum[accum.length - 1].length === 3) {
        const newGroup = [];
        newGroup.push(post);
        accum.push(newGroup);
      } else {
        accum[accum.length - 1].push(post);
      }
      return accum;
    };
    const groupedUserPosts = posts.reduce(reducer, []);

    return (
      <div className="main">
        <Route
          path="/users/:ownerId/p/:postId"
          render={() => <ModalPost setModalPost={setModalPost} />}
        />
        {modalFollowers && (
          <ModalFollowers
            usersList={modalFollowers}
            setModalFollowers={setModalFollowers}
          />
        )}
        {modalFollowings && (
          <ModalFollowings
            usersList={modalFollowings}
            setModalFollowings={setModalFollowings}
          />
        )}
        <header className="user_header">
          <Avatar avatar={avatar} size="big" />
          <section className="user_info">
            <div className="login_subscribe">
              <h1 className="login">{login}</h1>
              <FollowButton
                userId={id}
                size="big_btn"
                user={user}
                setUser={setUser}
              />
            </div>
            <ul className="user_data">
              <li>
                <span className="data">{posts.length}</span>
                <span className="data_type">
                  {posts.length === 1 ? " post" : " posts"}
                </span>
              </li>
              <li
                className={followersCount ? "followers" : "followers_empty"}
                onClick={() => {
                  if (followersCount) setModalFollowers(followers);
                }}
              >
                <span className="data">{followersCount || "0"}</span>
                <span className="data_type">
                  {followersCount === 1 ? " follower" : " followers"}
                </span>
              </li>
              <li
                className={followingsCount ? "followings" : "followings_empty"}
                onClick={() => {
                  if (followingsCount) setModalFollowings(following);
                }}
              >
                <span className="data">{followingsCount || "0"}</span>
                <span className="data_type"> following</span>
              </li>
            </ul>
            <div className="info">
              {(!!firstName || !!lastName) && (
                <h3 className="name">{firstName + " " + lastName}</h3>
              )}
              {!!email && <span className="email">{email}</span>}
            </div>
          </section>
        </header>
        <article className="user_posts">
          <div className="posts_wrapper">
            {posts.length > 0 ? (
              groupedUserPosts.map((postGroup, index) => {
                return (
                  <LazyLoad
                    height={200}
                    offset={100}
                    key={"postsGroup " + (index + 1)}
                  >
                    <div className={"posts_group"}>
                      {postGroup.map((post) => {
                        return (
                          <UsersPost
                            key={"post_" + post._id}
                            post={post}
                            postOwner={user}
                            modalPost={modalPost}
                            setModalPost={setModalPost}
                          />
                        );
                      })}
                    </div>
                  </LazyLoad>
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
