import { Link } from "react-router-dom";

import { Avatar } from "../components/avatar";
import { FollowButton } from "../components/followBtn";

const UserCard = ({ user: { avatar, login, _id, id } }) => {
  return (
    <li className="users_list_card">
      <div className="user_link">
        <Link to={"/users/" + (_id || id)} className="ref_avatar">
          <Avatar avatar={avatar} size="small" />
        </Link>
        <div className="link_login">
          <Link to={"/users/" + (_id || id)} className="ref">
            {login}
          </Link>
        </div>
      </div>
      <div className="subscribe_btn">
        <FollowButton userId={_id || id} size="medium_btn" />
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
