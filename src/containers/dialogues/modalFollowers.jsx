import { ModalWindow } from "../../components/modalWindow";
import { UsersList } from "../usersList";
import "./dialogues.css";

export const ModalFollowers = ({ usersList, setModalFollowers }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalFollowers(null)}>
      <div className="small_modal_wrapper">
        <h2>Followers</h2>
        <UsersList usersList={usersList} />
      </div>
    </ModalWindow>
  );
};
