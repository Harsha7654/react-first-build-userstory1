import { useState } from "react";
import "./Modal.css";

export function Modal({ show, title, children }) {
  // Initialization -------------------------------------------------------
  // State ------------------------------------------------------------------
  // Handlers --------------------------------------------------------------
  // View ------------------------------------------------------------------
  return !show ? null : (
    <div className="ModalOverlay">
      <div className="ModalPane">
        <header>
          <p>{title}</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export function useModal(isOpen, initialContent = null) {
  // Initialization -------------------------------------------------------
  // State ------------------------------------------------------------------
  const [state, setState] = useState({ show: isOpen, content: initialContent });

  // Handlers
  const open = (content) => {
    setState({ show: true, content }); // content: content
  };
  // grabs what was previously state, and only change the show property
  const close = () => setState({ ...state, show: false });
  // View
  return [state.show, state.content, open, close];
}
