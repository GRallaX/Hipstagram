import { ModalWindow } from "../../components/modalWindow";
import { UsersList } from "../usersList";
import "./smallModals.css";

export const ModalFollowings = ({ usersList, setModalFollowings }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalFollowings(null)}>
      <div className="small_modal_wrapper">
        <h2>Following</h2>
        <UsersList usersList={usersList} />
      </div>
    </ModalWindow>
  );
};
