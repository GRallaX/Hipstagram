import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../store/currentUser/thunks";

import { SearchInput } from "../components/searchUsersInput";
import { ReactComponent as PlusIcon } from "../images/plus_icon.svg";
import { ReactComponent as ProfileIcon } from "../images/profile_icon.svg";
import { ReactComponent as HomeSymbol } from "../images/home_icon.svg";
import { ReactComponent as SearchSymbol } from "../images/search_icon.svg";
import { ReactComponent as LogoutIcon } from "../images/logout_icon.svg";
import Logo from "../images/logo 1.png";

export const Header = () => {
  const dispatch = useDispatch();
  const { id: currentUserId, login: currentUserLogin } = useSelector(
    state => state.currentUser
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

  const handleOpenSearch = () => {
    if (!showSearch) {
      setShowSearch(true);
      setTimeout(() => searchInput.current.focus(), 100);
    } else {
      setShowSearch(false);
    }
  };

  return (
    <header className="main_header">
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="hipstagram logo" />
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
            tabIndex="0"
            onClick={handleOpenSearch}
            onKeyPress={e => {
              if (e.key === "Enter") handleOpenSearch();
            }}
          >
            <SearchSymbol />
          </span>
        )}
        <span
          className="add_new_post_btn"
          tabIndex="0"
          aria-label="Add new post"
        >
          <PlusIcon />
        </span>
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
          tabIndex="0"
          onClick={() => {
            dispatch(logOutUser());
          }}
          onKeyPress={e => {
            if (e.key === "Enter") dispatch(logOutUser());
          }}
        >
          <LogoutIcon />
        </span>
      </nav>
    </header>
  );
};
