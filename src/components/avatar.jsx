import defaultAvatarImage from "../images/default_avatar.png";

export const Avatar = ({ avatar, size, children }) => {
  return (
    <div className={"avatar " + size}>
      <img src={avatar || defaultAvatarImage} alt={"avatar " + avatar} />
      {children}
    </div>
  );
};
