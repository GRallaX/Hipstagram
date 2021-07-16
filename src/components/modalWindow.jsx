import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import FocusTrap from "focus-trap-react";

export const ModalWindow = ({ children, closeModalFunc }) => {
  const modalContainer = useRef();
  const [modalSize, setModalSize] = useState();

  useEffect(() => {
    document.querySelector("body").className = "body scroll_hidden";
    return () => (document.querySelector("body").className = "body");
  }, []);

  const handleResize = useCallback(entries => {
    if (!Array.isArray(entries)) return;

    const [entry] = entries;
    if (entry.contentRect.height >= window.innerHeight - 170) {
      setModalSize("big");
    } else {
      setModalSize("small");
    }
  }, []);

  useLayoutEffect(() => {
    if (!modalContainer.current) return;

    let resizeObserver = new ResizeObserver(entries => handleResize(entries));
    resizeObserver.observe(modalContainer.current);

    return () => {
      resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, [modalContainer, handleResize]);

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
          className={`modal_container ${modalSize}`}
          onClick={e => e.stopPropagation()}
          ref={modalContainer}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};
