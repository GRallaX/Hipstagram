import { useEffect } from "react";

export const ModalWindow = ({ children, closeModalFunc }) => {
  useEffect(() => {
    document.querySelector("body").className = "body scroll_hidden";
    return () => (document.querySelector("body").className = "body");
  });

  return (
    <div
      className="modal_wrapper"
      key="modal_wrapper"
      onClick={() => {
        closeModalFunc();
      }}
    >
      <div className="modal_window" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
