import { ModalWindow } from "../../components/modalWindow";
import { UsersList } from "../usersList";
import "./smallModals.css";

export const ModalFollowings = ({ usersList, setModalFollowings }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalFollowings(null)}>
      <h2>Following</h2>
      <UsersList usersList={usersList} />
    </ModalWindow>
  );
};
