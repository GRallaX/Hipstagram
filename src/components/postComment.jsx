import { Link } from "react-router-dom";
import { Avatar } from "../components/avatar";

export const PostComment = ({ postId, id, owner, text, isEdited }) => {
  return (
    <li className="post_comment">
      <Link to={"/users/" + owner.id} className="user_comment_ref">
        <Avatar avatar={owner.avatar} size="small" />
        {owner.login}
      </Link>
      <p>{text}</p>
    </li>
  );
};
