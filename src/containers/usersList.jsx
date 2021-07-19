import { useRef } from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../components/avatar";
import { FollowButton } from "../components/followBtn";
import useLazyLoad from "../components/useLazyLoad";

const UserCard = ({ user }) => {
  const { avatar, login, _id, id } = user;

  return (
    <li className="users_list_card">
      <Link to={"/users/" + (_id || id)} className="ref_avatar">
        <Avatar avatar={avatar} size="small" />
      </Link>
      <div className="link_login">
        <Link to={"/users/" + (_id || id)} className="ref">
          {login}
        </Link>
      </div>

      <div className="subscribe_btn">
        <FollowButton user={user} size="medium_btn" />
      </div>
    </li>
  );
};

export const UsersList = ({ usersList }) => {
  const containerRef = useRef();
  const usersForRender = useLazyLoad(containerRef, usersList, 100);

  return (
    <ul className="users_list" ref={containerRef}>
      {usersForRender.length &&
        usersForRender.map(user => {
          return <UserCard user={user} key={user._id || user.id} />;
        })}
    </ul>
  );
};
