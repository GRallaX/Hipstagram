import { ModalWindow } from "../components/modalWindow";
import { UsersList } from "./usersList";

export const ModalLikes = ({ usersList, setModalLikes }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalLikes(false)}>
      <h2>Likes</h2>
      <UsersList usersList={usersList} />
    </ModalWindow>
  );
};
