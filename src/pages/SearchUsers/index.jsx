import { useState, useEffect } from "react";
import { searchUsersByLogin } from "../../api/users";

import { UsersList } from "../../containers/usersList";
import { LoadingIconBig } from "../../components/loadingIcon";
import "./search.css";

export const SearchUsers = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;
    document.title = "Users Search";
    (async () => {
      const { data: users } = await searchUsersByLogin(
        props.location.search.slice(2)
      );
      if (!cleanupFunction) {
        setUsersList(users);
        setIsLoading(false);
      }
    })();
    return () => (cleanupFunction = true);
  }, [props.location.search]);

  if (isLoading) {
    return (
      <div className="main">
        <LoadingIconBig />
      </div>
    );
  } else if (!isLoading && !usersList.length) {
    return (
      <div className="main">
        <div className="users_search">
          <h2>No Users Found</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="users_search">
          <h2>Users Search</h2>
          <UsersList usersList={usersList} />
        </div>
      </div>
    );
  }
};
