import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function LoginModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="login-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="login-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function SignupModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="signup-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="signup-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function ModifyVenueModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modify-venue-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modify-venue-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function EditItineraryModifyVenueModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modify-venue-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modify-venue-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function EmailModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="email-modal">
      <div id="modal-background" onClick={onClose} />
      <div id="email-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
