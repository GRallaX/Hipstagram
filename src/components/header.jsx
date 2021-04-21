import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { logOutUser } from "../store/currentUser/thunks";
import logoutIcon from "../images/logout_icon.png";

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: currentUserId, login: currentUserName } = useSelector(
    (state) => state.currentUser
  );
  return (
    <header>
      <input
        type="text"
        className="user_search_input"
        onChange={() => {
          if (history.location.pathname.search(/\/search_users/g)) {
            history.push("/search_users");
          } else {
            history.replace("/search_users");
          }
        }}
      />
      <div className="header_navigation">
        <NavLink
          to="/feed"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          <span>Feed</span>
        </NavLink>
        <NavLink
          to={"/user/" + currentUserId}
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
      </div>
    </header>
  );
};
