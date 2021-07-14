import defaultAvatarImage from "../images/default_avatar.png";

export const Avatar = ({ avatar, size, onClick, children }) => {
  return (
    <div className={"avatar " + size} onClick={onClick}>
      <img src={avatar || defaultAvatarImage} alt={"avatar " + avatar} />
      {children}
    </div>
  );
};
