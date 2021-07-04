import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ReactComponent as SearchSymbol } from "../images/search_icon.svg";

const debounce = (
  (timer = null) =>
  (callback, delay = 500) =>
  (...args) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      return callback(...args);
    }, delay);
  }
)();

export const SearchInput = ({ searchInput }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/users_search") {
      searchInput.current.focus();
      if (history.action === "POP")
        searchInput.current.value = location.search.slice(2) || "";
    } else {
      searchInput.current.value = "";
    }
  }, [location, searchInput, history.action]);

  const handleSearchUsers = e => {
    if (!e.target.value.trim().length) {
      return;
    }
    if (history.location.pathname.search(/\/users_search/g)) {
      history.push("/users_search?=" + e.target.value.trim());
    } else {
      history.replace("/users_search?=" + e.target.value.trim());
    }
  };

  return (
    <div className="users_search_input_container">
      <input
        key="users_search_input"
        type="text"
        ref={searchInput}
        className="users_search_input"
        onChange={e => debounce(handleSearchUsers, 800)(e)}
        defaultValue={
          location.pathname === "/users_search" ? location.search.slice(2) : ""
        }
        autoCapitalize="none"
        placeholder="Search"
      />
      <span>
        <SearchSymbol />
      </span>
    </div>
  );
};
