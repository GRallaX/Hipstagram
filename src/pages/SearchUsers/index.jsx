import { useState, useEffect } from "react";
import { searchUsersByLogin } from "../../api/users";

import { UsersList } from "../../containers/usersList";
import { toast } from "react-toastify";
import { LoadingIconBig } from "../../components/loadingIcon";
import "./search.css";

export const SearchUsers = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;

    document.title = "Users Search";
    (async () => {
      try {
        const { data: users } = await searchUsersByLogin(
          props.location.search.slice(2)
        );
        if (!cleanupFunction) {
          setUsersList(users);
          setIsLoading(false);
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
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
        <div className="empty">
          <h2>No users found</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="users_search">
          <h2>Users search</h2>
          <UsersList usersList={usersList} />
        </div>
      </div>
    );
  }
};
