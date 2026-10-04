import React, { useEffect } from "react";
import { FaSignOutAlt, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import "./LogoutModal.css";

function LogoutModal({ isOpen, onClose, onConfirm, isLoading = false }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("logout-modal-overlay") && !isLoading) {
      onClose();
    }
  };

  return (
    <div className="logout-modal-overlay" onClick={handleBackdropClick}>
      <div className="logout-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="logout-modal-close"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="logout-modal-icon-wrap">
          <FaSignOutAlt className="logout-modal-icon" />
        </div>

        <h2 className="logout-modal-title">Confirm Logout</h2>

        <p className="logout-modal-text">
          Are you sure you want to log out? You'll need to sign in again to
          access your family trees.
        </p>


        <div className="logout-modal-actions">
          <button
            type="button"
            className="logout-modal-btn logout-modal-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="logout-modal-btn logout-modal-btn-confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;