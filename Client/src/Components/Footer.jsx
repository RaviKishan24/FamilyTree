import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src={logo} alt="Family Tree logo" className="footer-logo" />
          </Link>
          <p className="footer-tagline">
            Preserve your family legacy and connect generations with our
            modern digital family tree platform.
          </p>

          <div className="footer-contact">
            <span className="contact-item">
              <FaEnvelope className="contact-icon" />
              hello@familytree.com
            </span>
            <span className="contact-item">
              <FaPhone className="contact-icon" />
              +91 98765 43210
            </span>
            <span className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              India
            </span>
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/family-trees">My Tree</Link>
            </li>
            <li>
              <Link to="/members">Members</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>

        {/* ============================
            SOCIAL
        ============================ */}
        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <p className="footer-social-text">
            Follow us for updates and stories.
          </p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="social-link"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Family-Tree. All Rights Reserved.</p>
        <p className="footer-bottom-links">
          <Link to="/privacy">Privacy</Link>
          <span className="dot">•</span>
          <Link to="/terms">Terms</Link>
          <span className="dot">•</span>
          <Link to="/sitemap">Sitemap</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;