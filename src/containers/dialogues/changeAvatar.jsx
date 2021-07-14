import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../store/currentUser/thunks";

import { ModalWindow } from "../../components/modalWindow";
import { Avatar } from "../../components/avatar";
import loadingIcon from "../../images/loading_small.svg";
import "./dialogues.css";

const convertImage = file => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.onerror = e => rej(e);
    fileReader.readAsDataURL(file);
  });
};

export const ChangeAvatar = ({ avatar, closeFunc }) => {
  const [sending, setSending] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const avatarInput = useRef();

  const handleResetAvatar = e => {
    e.preventDefault();
    setAvatarPreview("");
    if (error) setError(false);
  };

  const handleSetAvatar = () => {
    if (loadingFile || sending) {
      setError("Image is uploading");
      return;
    }
    avatarInput.current.click();
  };

  const validationAvatar = file => {
    if (file.size > 75 * 1024) throw new Error("File should be max 75kb size");
  };

  const handleLoadAvatar = async event => {
    try {
      setLoadingFile(true);
      const [file] = event.target.files;
      await validationAvatar(file);
      const convertedImage = await convertImage(file);
      setAvatarPreview(convertedImage);
      setError(false);
      setLoadingFile(false);
    } catch (error) {
      setLoadingFile(false);
      setError(error.message);
    }
  };

  const handleSubmitAvatar = async e => {
    e.preventDefault();
    setSending(true);
    const dispatchedAvatar = await dispatch(
      updateCurrentUser("avatar", avatarPreview)
    );
    if (dispatchedAvatar.response) {
      setError(dispatchedAvatar.response.data);
      setSending(false);
      return;
    }

    setSending(false);
    closeFunc();
  };

  return (
    <ModalWindow closeModalFunc={closeFunc}>
      <div className="small_modal_wrapper">
        <h2>Avatar editing</h2>
        <form className="avatar_editing_form" onSubmit={handleSubmitAvatar}>
          <div className="editing_container">
            <h3>Preview</h3>
            <Avatar avatar={avatarPreview} size="big" />
            <div className="edit_btns">
              <button
                className="delete"
                type="button"
                onClick={handleResetAvatar}
                disabled={avatarPreview ? undefined : true}
              >
                delete
              </button>
              <button
                className="upload"
                type="button"
                onClick={handleSetAvatar}
              >
                {loadingFile ? (
                  <img src={loadingIcon} alt="loading" />
                ) : (
                  "upload"
                )}
                <input
                  type="file"
                  id="avatar_input"
                  ref={avatarInput}
                  accept=".png, .jpg, .jpeg"
                  onChange={handleLoadAvatar}
                />
              </button>
            </div>
            <span
              className={!error ? "avatar_message" : "avatar_message error"}
            >
              {error
                ? error
                : "Image file should be .png, .jpg or .jpeg format and max size 75kb"}
            </span>
          </div>
          <div className="btns">
            <button type="button" className="cancel" onClick={closeFunc}>
              Cancel
            </button>
            <button className="submit" type="submit">
              {sending ? <img src={loadingIcon} alt="loading" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};
