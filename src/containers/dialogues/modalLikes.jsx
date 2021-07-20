import { ModalWindow } from "../../components/modalWindow";
import { UsersList } from "../usersList";
import "./dialogues.css";

export const ModalLikes = ({ usersList, setModalLikes }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalLikes(false)}>
      <div className="small_modal_wrapper">
        <h2>Likes</h2>
        <UsersList usersList={usersList.reverse()} />
      </div>
    </ModalWindow>
  );
};
