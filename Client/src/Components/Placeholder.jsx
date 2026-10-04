import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCompass,
  FaTools,
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";
import "./Placeholder.css";

function Placeholder({
  variant = "notfound",
  title,
  message,
  showProgress = false,
}) {
  const navigate = useNavigate();
  const isInProgress = variant === "inprogress";

  const config = isInProgress
    ? {
        icon: <FaTools className="placeholder-icon" />,
        label: "COMING SOON",
        defaultTitle: "We're Working On It",
        defaultMessage:
          "This page is under construction. Our team is building something great here — check back soon!",
      }
    : {
        icon: <FaCompass className="placeholder-icon" />,
        label: "ERROR 404",
        defaultTitle: "Page Not Found",
        defaultMessage:
          "The page you're looking for doesn't exist, was moved, or is temporarily unavailable.",
      };

  return (
    <div className="placeholder-page">
      <div className="placeholder-bg-shape placeholder-bg-shape-1" />
      <div className="placeholder-bg-shape placeholder-bg-shape-2" />

      <div className="placeholder-container">
        <div
          className={`placeholder-icon-wrap ${
            isInProgress ? "spin" : "pulse"
          }`}
        >
          {config.icon}
        </div>

        <span className="placeholder-label">{config.label}</span>

        {!isInProgress && <h1 className="placeholder-code">404</h1>}

        <h2 className="placeholder-title">
          {title || config.defaultTitle}
        </h2>

        <p className="placeholder-text">
          {message || config.defaultMessage}
        </p>

        {isInProgress && showProgress && (
          <div className="placeholder-progress">
            <div className="placeholder-progress-bar">
              <div className="placeholder-progress-fill" />
            </div>
            <div className="placeholder-progress-meta">
              <span>In Development</span>
              <span>~70% complete</span>
            </div>
          </div>
        )}

        <div className="placeholder-actions">
          <Link to="/" className="placeholder-btn placeholder-btn-primary">
            <FaHome className="btn-icon" />
            Back to Home
          </Link>

          <button
            type="button"
            className="placeholder-btn placeholder-btn-secondary"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="btn-icon" />
            Go Back
          </button>
        </div>

        <div className="placeholder-footer">
          {isInProgress ? (
            <>
              <div className="placeholder-footer-item">
                <FaBell className="footer-icon" />
                <span>We'll notify you when it's ready</span>
              </div>
             
            </>
          ) : (
            <>
              <span className="placeholder-footer-label">Popular pages:</span>
              <Link to="/families" className="placeholder-footer-link">
                <FaSearch className="footer-icon" />
                Family Trees
              </Link>
              <Link to="/about" className="placeholder-footer-link">
                About
              </Link>
              <Link to="/howtouse" className="placeholder-footer-link">
                How to Use
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Placeholder;