import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { logOutUser } from "../store/currentUser/thunks";
import logoutIcon from "../images/logout_icon.png";

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
  const { id: currentUserId, login: currentUserName } = useSelector(
    (state) => state.currentUser
  );
  return (
    <header>
      <input
        key="users_search_input"
        type="text"
        className="users_search_input"
        onChange={(event) => handleSearchUsers(event, history)}
        defaultValue={
          location.pathname === "/users_search" ? location.search.slice(2) : ""
        }
      />
      <nav className="header_navigation">
        <NavLink
          to="/feed"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          <span>Feed</span>
        </NavLink>
        <NavLink
          to={"/users/" + currentUserId}
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          <span>{currentUserName}</span>
        </NavLink>
        <span
          className="log_out_btn"
          aria-label="Log Out"
          onClick={() => {
            dispatch(logOutUser());
          }}
        >
          <img src={logoutIcon} alt="Log out" />
        </span>
      </nav>
    </header>
  );
};
