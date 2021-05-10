import { useEffect } from "react";

export const ModalWindow = ({ children, closeModalFunc }) => {
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => (document.querySelector("body").style.overflow = "visible");
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
