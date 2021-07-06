import { useEffect } from "react";
import FocusTrap from "focus-trap-react";

export const ModalWindow = ({ children, closeModalFunc }) => {
  useEffect(() => {
    document.querySelector("body").className = "body scroll_hidden";
    return () => (document.querySelector("body").className = "body");
  });

  return (
    <FocusTrap focusTrapOptions={{ returnFocusOnDeactivate: false }}>
      <div
        className="modal_wrapper"
        onClick={() => {
          closeModalFunc();
        }}
        onKeyUp={e => {
          if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
            closeModalFunc();
            console.log(e);
          }
        }}
      >
        <div className="modal_window" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};
