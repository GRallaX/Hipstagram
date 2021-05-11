import { useState, useEffect } from "react";
import { searchUsersByID } from "../api/users";
import { UsersList } from "../containers/usersList";
import loadingIcon from "../images/loading_big.svg";

export const SearchUsers = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;
    document.title = "Hipstagram - Users Search";
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
      <main>
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </main>
    );
  } else if (!isLoading && !usersList.length) {
    return (
      <main>
        <h2>No Users Found</h2>
      </main>
    );
  } else {
    return (
      <main>
        <h2>Users Search</h2>
        <UsersList usersList={usersList} />
      </main>
    );
  }
};
