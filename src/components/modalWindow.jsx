import { useCallback, useEffect, useRef, useState } from "react";
import FocusTrap from "focus-trap-react";
import { Link } from "react-router-dom";

import { ReactComponent as LeftArrow } from "../images/left-arrow.svg";
import { ReactComponent as RightArrow } from "../images/right-arrow.svg";

export const ModalWindow = ({
  children,
  closeModalFunc,
  linkLeft,
  linkRight,
}) => {
  const modalContainer = useRef();
  const [modalSize, setModalSize] = useState();

  useEffect(() => {
    document.querySelector("body").className = "body scroll_hidden";
    return () => (document.querySelector("body").className = "body");
  }, []);

  const handleResize = useCallback(entries => {
    if (!Array.isArray(entries)) return;

    const [entry] = entries;
    if (entry.contentRect.height >= window.innerHeight - 300) {
      setModalSize("big");
    } else {
      setModalSize("small");
    }
  }, []);

  useEffect(() => {
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
          className={`modal_container ${modalSize}${
            linkLeft ? " link_left" : ""
          }${linkRight ? " link_right" : ""}`}
          onClick={e => e.stopPropagation()}
          ref={modalContainer}
          tabIndex="0"
        >
          {linkLeft && (
            <div className="link_to_left" onClick={e => e.stopPropagation()}>
              <Link to={linkLeft}>
                <LeftArrow />
              </Link>
            </div>
          )}
          {children}
          {linkRight && (
            <div className="link_to_right" onClick={e => e.stopPropagation()}>
              <Link to={linkRight}>
                <RightArrow />
              </Link>
            </div>
          )}
        </div>
      </div>
    </FocusTrap>
  );
};
