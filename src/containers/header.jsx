import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logOutUser } from "../store/currentUser/thunks";
import { EditPost } from "./dialogues/editPost";

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
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSearch, setShowSearch] = useState(false);
  const [createPost, setCreatePost] = useState(false);

  const searchInput = useRef();

  useEffect(() => {
    if (location.pathname === "/users_search") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location]);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleOpenCreatePost = () => {
    setCreatePost(v => !v);
  };

  useEffect(() => {
    if (searchInput.current && showSearch) searchInput.current.focus();
  }, [showSearch]);

  return (
    <header className="main_header">
      <div className={screenWidth < 540 && showSearch ? "logo hidden" : "logo"}>
        <NavLink to="/">
          <img src={Logo} alt="hipstagram logo" />
          {screenWidth > 750 && <span>Hipstagram</span>}
        </NavLink>
      </div>
      {screenWidth > 750 && <SearchInput searchInput={searchInput} />}
      {screenWidth < 750 && showSearch ? (
        <SearchInput searchInput={searchInput} />
      ) : null}
      <nav className="header_navigation">
        {screenWidth < 750 && (
          <span
            className="search_Btn"
            tabIndex="0"
            onClick={() => setShowSearch(v => !v)}
            onKeyPress={e => {
              if (e.key === "Enter") setShowSearch(v => !v);
            }}
          >
            <SearchSymbol />
          </span>
        )}
        <span
          className="add_new_post_btn"
          tabIndex="0"
          aria-label="Add new post"
          onClick={handleOpenCreatePost}
          onKeyPress={e => {
            if (e.key === "Enter") handleOpenCreatePost();
          }}
        >
          <PlusIcon />
        </span>
        <span className="feed_btn">
          <NavLink to="/feed">
            {screenWidth > 750 ? "Feed" : <HomeSymbol />}
          </NavLink>
        </span>
        <span className="my_profile_btn">
          <NavLink
            to={location => {
              if (location.pathname === "/users/" + currentUserId) {
                return {
                  ...location,
                  pathname: "/users/" + currentUserId,
                  state: {
                    ...location.state,
                    needToReload: location.key,
                  },
                };
              }
              return {
                ...location,
                pathname: "/users/" + currentUserId,
              };
            }}
          >
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
      {createPost && <EditPost closeFunc={handleOpenCreatePost} />}
    </header>
  );
};
