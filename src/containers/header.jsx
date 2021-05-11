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

export const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: currentUserId, login: currentUserLogin } = useSelector(
    (state) => state.currentUser
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        <img src={Logo} alt="hip logo" />
        {screenWidth > 750 && <span>Hipstagram</span>}
      </div>
      <div
        className="users_search"
        ref={searchInput}
        style={
          screenWidth < 750
            ? location.pathname === "/users_search"
              ? { display: "initial" }
              : { display: "none" }
            : { display: "initial" }
        }
      >
        <input
          key="users_search_input"
          type="text"
          className="users_search_input"
          onChange={(event) => handleSearchUsers(event, history)}
          defaultValue={
            location.pathname === "/users_search"
              ? location.search.slice(2)
              : ""
          }
          autoCapitalize="none"
          placeholder="Search"
        />
        <span>
          <SearchSymbol />
        </span>
      </div>
      <nav className="header_navigation">
        {screenWidth < 750 && (
          <span
            className="search_Btn"
            onClick={() =>
              searchInput.current.style.display === "none"
                ? (searchInput.current.style.display = "initial")
                : (searchInput.current.style.display = "none")
            }
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
