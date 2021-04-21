export const Avatar = ({ avatar, size }) => {
  return (
    <div className={"avatar " + size}>
      <img src={avatar || "./images/default_avatar.png"} alt={avatar} />
    </div>
  );
};
