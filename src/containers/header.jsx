import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { logOutUser } from "../store/currentUser/thunks";

import Logo from "../images/logo 1.png";
import { ReactComponent as LogoutIcon } from "../images/logout_icon.svg";
import { ReactComponent as ProfileIcon } from "../images/profile_icon.svg";
import { ReactComponent as SearchSymbol } from "../images/search_icon.svg";
import { ReactComponent as HomeSymbol } from "../images/home_icon.svg";

const handleSearchUsers = (event, history) => {
  if (!event.target.value.length) {
    return;
  }
  if (!!history.location.pathname.search(/\/users_search/g)) {
    history.push("/users_search?=" + event.target.value);
  } else {
    history.replace("/users_search?=" + event.target.value);
  }
};

const SearchInput = ({ searchInput }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="users_search_input_container">
      <input
        key="users_search_input"
        type="text"
        ref={searchInput}
        className="users_search_input"
        onChange={(event) => handleSearchUsers(event, history)}
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

export const Header = () => {
  const dispatch = useDispatch();
  const { id: currentUserId, login: currentUserLogin } = useSelector(
    (state) => state.currentUser
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSearch, setShowSearch] = useState(false);

  const searchInput = useRef();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <header className="main_header">
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="hip logo" />
          {screenWidth > 750 && <span>Hipstagram</span>}
        </NavLink>
      </div>
      {screenWidth > 750 ? (
        <SearchInput searchInput={searchInput} />
      ) : showSearch ? (
        <SearchInput searchInput={searchInput} />
      ) : null}
      <nav className="header_navigation">
        {screenWidth < 750 && (
          <span
            className="search_Btn"
            onClick={() => {
              if (!showSearch) {
                setShowSearch(true);
                setTimeout(() => searchInput.current.focus(), 100);
              } else {
                setShowSearch(false);
              }
            }}
          >
            <SearchSymbol />
          </span>
        )}
        <span className="feed_btn">
          <NavLink to="/feed">
            {screenWidth > 750 ? "Feed" : <HomeSymbol />}
          </NavLink>
        </span>
        <span className="my_profile_btn">
          <NavLink to={"/users/" + currentUserId}>
            {screenWidth > 750 ? currentUserLogin : <ProfileIcon />}
          </NavLink>
        </span>
        <span
          className="log_out_btn"
          aria-label="Log Out"
          onClick={() => {
            dispatch(logOutUser());
          }}
        >
          <LogoutIcon />
        </span>
      </nav>
    </header>
  );
};
