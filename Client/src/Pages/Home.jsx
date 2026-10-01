import React from "react";
import banner2 from "../assets/bannerNew.png";
import "./Home.css";
import RecentlyAddedFamilies from "../Components/RecentlyAddedFamilies";
import Testimonials from "../Components/Testimonials";
import { Link } from "react-router-dom";
import {
  FaTree,
  FaLock,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      <section className="banner-container">
        <img className="banner" src={banner2} alt="Family tree banner" />
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1 className="banner-title">Discover Your Family Story</h1>
          <p className="banner-subtitle">
            Build, connect, and preserve your family legacy — one generation at
            a time.
          </p>
          <Link to="/add-family" className="banner-cta">
            Get Started
            <FaArrowRight className="cta-arrow" />
          </Link>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <span className="about-label">ABOUT OUR PLATFORM</span>

          <h2 className="about-title">
            Preserving Family Stories for Generations
          </h2>

          <p className="about-description">
            Our platform helps you create, organize, and share your family tree
            in a secure and beautiful way. Connect generations, preserve
            memories, and build a digital legacy that lasts forever.
          </p>

          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <FaTree className="feature-icon" />
              </div>
              <h3 className="feature-title">Easy Tree Creation</h3>
              <p className="feature-text">
                Build your family tree in minutes with an intuitive
                drag-and-drop builder.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <FaLock className="feature-icon" />
              </div>
              <h3 className="feature-title">Secure &amp; Private</h3>
              <p className="feature-text">
                Your family data stays encrypted and only visible to those you
                invite.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <FaUsers className="feature-icon" />
              </div>
              <h3 className="feature-title">Multi-Generation</h3>
              <p className="feature-text">
                Track ancestors, descendants, spouses, and extended family
                seamlessly.
              </p>
            </div>
          </div>

          <div className="about-cta-wrap">
            <Link to="/add-family" className="add-family-btn">
              Start Building Now
              <FaArrowRight className="btn-arrow" />
            </Link>

            <div className="about-badges">
              <span className="badge">
                <FaCheckCircle className="badge-icon" />
                Free to start
              </span>
              <span className="badge">
                <FaCheckCircle className="badge-icon" />
                No credit card
              </span>
              <span className="badge">
                <FaCheckCircle className="badge-icon" />
                Unlimited members
              </span>
            </div>
          </div>
        </div>
      </section>

      <RecentlyAddedFamilies />
      <Testimonials />
    </div>
  );
}

export default Home;
