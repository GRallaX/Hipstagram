import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "../components/avatar";
import { FollowButton } from "../components/followBtn";
import loadingIcon from "../images/loading_big.svg";
import { fetchCurrentUser } from "../api/currentUser";
import { getUserById } from "../api/users";

export const User = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id: currentUserId, token } = useSelector(
    (state) => state.currentUser
  );

  useEffect(() => {
    try {
      (async () => {
        if (pageUserId === currentUserId) {
          const { data: currentUser } = await fetchCurrentUser(token);
          setUser({ ...currentUser });
          setIsLoading(currentUser);
          setIsLoading(false);
        } else {
          try {
            const { data: fetchedUser } = await getUserById(pageUserId);
            setUser({ ...fetchedUser });
            setIsLoading(false);
          } catch (e) {
            console.log(e);
            setIsLoading(false);
          }
        }
      })();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [pageUserId, token, currentUserId]);

  if (isLoading) {
    return (
      <main>
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </main>
    );
  } else if (!isLoading && !Object.keys(user).length) {
    return (
      <main>
        <h2>No such User</h2>
      </main>
    );
  } else {
    const { login, avatar, id, email, firstName, lastName } = user;

    return (
      <main>
        <h2>{login}</h2>
        <Avatar avatar={avatar} size="big" />
        <FollowButton userId={id} size="big_btn" />
        <div>
          <span>email: {!email ? "no email" : email}</span> <br />
          <span>firstName: {!firstName ? "no firstName" : firstName}</span>{" "}
          <br />
          <span>lastName: {!lastName ? "no lastName" : lastName}</span> <br />
          <span>login: {!login ? "no login" : login}</span> <br />
          <span>id: {!id ? "no id" : id}</span> <br />
        </div>
      </main>
    );
  }
};
