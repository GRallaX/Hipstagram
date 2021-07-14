import { useEffect, useRef, useState } from "react";

import { ModalWindow } from "../../components/modalWindow";

import loadingIcon from "../../images/loading_small.svg";
import "./dialogues.css";

export const EditingTextModal = ({
  header,
  textDefValue,
  onSubmitFunc,
  closeFunc,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const formRef = useRef();
  const textInput = useRef();

  const handleOnEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if (text) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const handleTextInput = e => {
    setText(e.target.value.trim());
    if (textDefValue === e.target.value.trim()) {
      setText("");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmitFunc(text);
      setIsLoading(false);
      closeFunc();
    } catch (e) {
      console.log(e.response);
      isLoading(false);
    }
  };

  useEffect(() => textInput.current.focus(), []);

  return (
    <ModalWindow closeModalFunc={closeFunc}>
      <div className="small_modal_wrapper">
        <h2>{header}</h2>
        <form className="text" onSubmit={handleSubmit} ref={formRef}>
          <label>
            <textarea
              className="new_text"
              name="text"
              placeholder="Enter text here..."
              aria-label="Enter text"
              maxLength="60"
              defaultValue={textDefValue}
              onChange={handleTextInput}
              onKeyDown={handleOnEnterPress}
              ref={textInput}
            />
          </label>
          <div className="btns">
            <button className="cancel" onClick={closeFunc}>
              Cancel
            </button>
            <button
              className={text ? "submit" : "submit disabled"}
              type="submit"
              disabled={text ? false : true}
            >
              {isLoading ? <img src={loadingIcon} alt="1" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};
