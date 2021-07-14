import { useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";

export const ModalWindow = ({ children, closeModalFunc }) => {
  const modalContainer = useRef();

  useEffect(() => {
    document.querySelector("body").className = "body scroll_hidden";
    return () => (document.querySelector("body").className = "body");
  });

  useEffect(() => {
    const modalHeight = modalContainer.current?.offsetHeight + 40;
    if (
      modalHeight >= window.innerHeight ||
      modalHeight + 130 >= window.innerHeight
    ) {
      modalContainer.current.className = "modal_container big";
    } else {
      modalContainer.current.className = "modal_container small";
    }
  }, [modalContainer.current?.offsetHeight]);

  const handleEscExit = e => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closeModalFunc();
    }
  };

  return (
    <FocusTrap focusTrapOptions={{ returnFocusOnDeactivate: false }}>
      <div
        className="modal_wrapper"
        onClick={closeModalFunc}
        onKeyUp={handleEscExit}
      >
        <div
          className="modal_container"
          onClick={e => e.stopPropagation()}
          ref={modalContainer}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};
