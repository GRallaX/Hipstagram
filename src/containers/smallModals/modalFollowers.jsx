import { ModalWindow } from "../../components/modalWindow";
import { UsersList } from "../usersList";
import "./smallModals.css";

export const ModalFollowers = ({ usersList, setModalFollowers }) => {
  return (
    <ModalWindow closeModalFunc={() => setModalFollowers(null)}>
      <h2>Followers</h2>
      <UsersList usersList={usersList} />
    </ModalWindow>
  );
};
