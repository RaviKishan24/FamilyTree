import React from "react";
import "./Footer.css";
import logo from "./assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + About */}
        <div className="footer-section">
          <img src={logo} alt="logo" className="footer-logo" />
          <p>
            Preserve your family legacy and connect generations with our
            modern digital family tree platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>My Tree</li>
            <li>Members</li>
            <li>Gallery</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Family-Tree. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;