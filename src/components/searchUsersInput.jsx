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
        type="text"
        className="users_search_input"
        maxLength="30"
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Users search"
        placeholder="Search"
        ref={searchInput}
        onChange={e => debounce(handleSearchUsers, 800)(e)}
        defaultValue={
          location.pathname === "/users_search" ? location.search.slice(2) : ""
        }
      />
      <span>
        <SearchSymbol />
      </span>
    </div>
  );
};
