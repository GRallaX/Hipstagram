import { Link } from "react-router-dom";

import { Avatar } from "../components/avatar";
import { FollowButton } from "../components/followBtn";

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
  return (
    <ul className="users_list">
      {usersList.map((user) => {
        return <UserCard user={user} key={user._id || user.id} />;
      })}
    </ul>
  );
};
