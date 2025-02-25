import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Modal, useModal } from "../UI/Modal"; // Import Modal and useModal
import "./Logout.css"; // Import the CSS file

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, modalContent, openModal, closeModal] = useModal(); // Use useModal hook

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const confirmLogout = () => {
    openModal(
      <div>
        <p>Are you sure you want to logout?</p>
        <button className="confirm-button" onClick={handleLogout}>
          Yes
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No
        </button>
      </div>
    );
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={confirmLogout}>
        Logout
      </button>
      <Modal show={showModal} title="Confirm Logout" onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
