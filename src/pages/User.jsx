import { useSelector } from "react-redux";
import { Avatar } from "../components/avatar";
import { FollowButton } from "../components/followBtn";

export const User = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const userList = useSelector((state) => state.users);
  const { id: currentUserId } = useSelector((state) => state.currentUser);
  const { email, firstName, lastName, login, id, avatar } = useSelector(
    (state) => {
      if (pageUserId === currentUserId) {
        return state.currentUser;
      } else if (!!userList[pageUserId]) {
        return state.users[pageUserId];
      } else {
        return state.currentUser;
      }
    }
  );

  if (currentUserId !== pageUserId && !userList[pageUserId]) {
    return (
      <main>
        <h2>No such User</h2>
      </main>
    );
  } else {
    return (
      <main>
        <h2>{login}</h2>
        <Avatar avatar={avatar} size="big" />
        <FollowButton userId={pageUserId} size="big_btn" />
        <div>
          <span>email: {!email ? "no email" : email}</span> <br />
          <span>firstName: {!firstName ? "no firstName" : firstName}</span>{" "}
          <br />
          <span>lastName: {!lastName ? "no lastName" : lastName}</span> <br />
          <span>login: {!login ? "no login" : login}</span> <br />
          <span>id: {!id ? "no id" : id}</span> <br />
        </div>
      </main>
    );
  }
};
