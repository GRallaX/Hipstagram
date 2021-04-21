import { Link } from "react-router-dom";
import { Avatar } from "./avatar";
import { FollowButton } from "./followBtn";

const UserCard = ({ avatar, login, _id }) => {
  <li key={_id} className="user_search_card">
    <div className="user_search_avatar">
      <Avatar avatar={avatar} login={login} size="small" />
      <Link to={"/user/" + _id} className="user_search_ref">
        {login}
      </Link>
      <FollowButton userId={_id} size="smal_btn" />
    </div>
  </li>;
};

export const UsersList = ({ usersList }) => {
  return (
    <ul className="user_search">
      {usersList.map((user) => {
        return <UserCard user={user} />;
      })}
    </ul>
  );
};
