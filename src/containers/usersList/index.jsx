import { Link } from "react-router-dom";

import "./usersList.css";
import { Avatar } from "../../components/avatar";
import { FollowButton } from "../../components/followBtn";

const UserCard = ({ user: { avatar, login, _id } }) => {
  return (
    <li className="users_list_card">
      <div className="user_link">
        <Avatar avatar={avatar} size="small" />
        <Link to={"/users/" + _id} className="ref">
          {login}
        </Link>
      </div>
      <div className="subscribe_btn">
        <FollowButton userId={_id} size="medium_btn" />
      </div>
    </li>
  );
};

export const UsersList = ({ usersList }) => {
  return (
    <ul className="users_list">
      {usersList.map((user) => {
        return <UserCard user={user} key={user._id} />;
      })}
    </ul>
  );
};
