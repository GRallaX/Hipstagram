import defaultAvatarImage from "../images/default_avatar.png";

export const Avatar = ({ avatar, size }) => {
  return (
    <div className={"avatar " + size}>
      <img src={avatar || defaultAvatarImage} alt={avatar} />
    </div>
  );
};
