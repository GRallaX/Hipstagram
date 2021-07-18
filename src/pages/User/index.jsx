import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation, useParams } from "react-router-dom";
import { getCurrentUser } from "../../store/currentUser/thunks";
import { getUserById } from "../../api/users";
import { getFollowersAndFollowings } from "../../api/users";

import { UsersPostsContainer } from "./usersPostsContainer";
import { ModalPost } from "../../containers/modalPost";
import { ModalFollowers } from "../../containers/dialogues/modalFollowers";
import { ModalFollowings } from "../../containers/dialogues/modalFollowings";
import { Avatar } from "../../components/avatar";
import { FollowButton } from "../../components/followBtn";

import { LoadingIconBig } from "../../components/loadingIcon";
import "./user.css";
import { toast } from "react-toastify";

export const User = () => {
  const dispatch = useDispatch();
  const { id: pageUserId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const [user, setUser] = useState({});
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

  const [modalFollowers, setModalFollowers] = useState(false);
  const [modalFollowings, setModalFollowings] = useState(false);
  const [modalPost, setModalPost] = useState(false);

  const currentUser = useSelector(state => state.currentUser);
  const { id: currentUserId } = currentUser;

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      if (pageUserId === currentUserId) {
        document.title = "My Profile";
        if (!cleanupFunction) {
          setUser(currentUser);
        }
      }
    })();

    return () => (cleanupFunction = true);
  }, [currentUserId, pageUserId, currentUser]);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      if (pageUserId !== currentUserId) {
        setIsLoading(true);
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
          toast.error(e.response?.data || e.message);
          setIsLoading(false);
        }
      }
    })();

    return () => (cleanupFunction = true);
  }, [pageUserId, currentUserId]);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      setModalFollowers(false);
      setModalFollowings(false);
      if (pageUserId === currentUserId) {
        setIsLoading(true);
        await dispatch(getCurrentUser());
        if (!cleanupFunction) {
          setIsLoading(false);
        }
      }
    })();
  }, [location.state?.needToReload, pageUserId, currentUserId, dispatch]);

  if (isLoading) {
    return (
      <div className="main">
        <LoadingIconBig />
      </div>
    );
  } else if (!isLoading && !Object.keys(user).length) {
    return (
      <div className="main">
        <div className="empty">
          <h2>No such user</h2>
        </div>
      </div>
    );
  } else {
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
                tabIndex={followersCount ? 0 : undefined}
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
                tabIndex={followingsCount ? 0 : undefined}
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
        <article className={posts.length ? "user_posts" : "user_posts empty"}>
          {!posts.length ? (
            <h2>No posts yet</h2>
          ) : (
            <UsersPostsContainer
              user={user}
              modalPost={modalPost}
              setModalPost={setModalPost}
            />
          )}
        </article>
      </div>
    );
  }
};
