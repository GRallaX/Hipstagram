import { useState, useEffect } from "react";

import "./search.css";
import { searchUsersByID } from "../../api/users";
import { UsersList } from "../../containers/usersList";
import loadingIcon from "../../images/loading_big.svg";

export const SearchUsers = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;
    document.title = "Users Search";
    (async () => {
      const { data: users } = await searchUsersByID(
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
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
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
