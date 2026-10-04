import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import {
  FaTree,
  FaShieldAlt,
  FaUsers,
  FaHeart,
  FaArrowRight,
  FaBullseye,
  FaEye,
  FaHandsHelping,
  FaLightbulb,
  FaLeaf,
} from "react-icons/fa";

const values = [
  {
    icon: <FaHeart />,
    title: "Family First",
    text: "Every feature we build starts with one question: will this help families connect more deeply?",
  },
  {
    icon: <FaShieldAlt />,
    title: "Privacy by Design",
    text: "Your family data is encrypted, private, and never shared. You control who sees what.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Community Driven",
    text: "Built with feedback from thousands of families who trust us with their stories.",
  },
  {
    icon: <FaLightbulb />,
    title: "Simple & Powerful",
    text: "No technical skills needed. Just a heart for family and a few minutes to get started.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "The Idea",
    text: "Started as a personal project to document one family's history across four generations.",
  },
  {
    year: "2026",
    title: "First Release",
    text: "Launched publicly with tree builder, spouse linking, and secure sharing.",
  },
  {
    year: "2026",
    title: "Growing Together",
    text: "Thousands of families joined. Added multi-generation support, photos, and stories.",
  },
  {
    year: "Today",
    title: "Preserving Legacies",
    text: "Continuing to build tools that help families preserve their stories for generations to come.",
  },
];

const team = [
  {
    name: "Ravi Sharma",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    role: "Head of Design",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Singh",
    role: "Lead Engineer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Neha Kapoor",
    role: "Community Lead",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function About() {
  return (
    <div className="about-page">
      {/* ============================
          HERO
      ============================ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-label">ABOUT US</span>
          <h1 className="about-hero-title">
            Preserving Family Stories, One Generation at a Time
          </h1>
          <p className="about-hero-subtitle">
            We believe every family has a story worth telling. Our platform
            makes it easy to build, connect, and preserve your family tree
            for generations to come.
          </p>

          <div className="about-hero-actions">
            <Link to="/add-family" className="btn-primary">
              Start Your Tree
              <FaArrowRight className="btn-arrow" />
            </Link>
            <Link to="/families" className="btn-secondary">
              Explore Trees
            </Link>
          </div>

          <div className="about-hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Families</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Members</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

  
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="mission-card">
              <div className="mission-icon-wrap">
                <FaBullseye className="mission-icon" />
              </div>
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-text">
                To make family history accessible to everyone — turning
                scattered memories into a beautiful, connected legacy that
                lasts forever.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon-wrap">
                <FaEye className="mission-icon" />
              </div>
              <h3 className="mission-title">Our Vision</h3>
              <p className="mission-text">
                A world where no family story is lost — where every
                generation can discover, preserve, and celebrate their roots.
              </p>
            </div>
          </div>
        </div>
      </section>

 
      <section className="about-values">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label">OUR VALUES</span>
            <h2 className="about-title">
              What We Stand For
            </h2>
            <p className="about-subtitle">
              The principles that guide every decision we make.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon-wrap">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="about-timeline">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label">OUR JOURNEY</span>
            <h2 className="about-title">
              The Story So Far
            </h2>
            <p className="about-subtitle">
              From a personal project to a platform trusted by families
              worldwide.
            </p>
          </div>

          <div className="timeline-wrap">
            {timeline.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      <section className="about-cta">
        <div className="about-cta-content">
          <div className="about-cta-icon-wrap">
            <FaTree className="about-cta-icon" />
          </div>
          <h2 className="about-cta-title">
            Ready to Preserve Your Family Story?
          </h2>
          <p className="about-cta-text">
            Join thousands of families building and sharing their legacies.
            It's free, secure, and takes just minutes to begin.
          </p>
          <Link to="/add-family" className="btn-primary btn-large">
            Start Building Now
            <FaArrowRight className="btn-arrow" />
          </Link>

          <div className="about-cta-badges">
            <span className="cta-badge">
              <FaLeaf className="badge-icon" />
              Free to start
            </span>
            <span className="cta-badge">
              <FaShieldAlt className="badge-icon" />
              Private &amp; secure
            </span>
            <span className="cta-badge">
              <FaUsers className="badge-icon" />
              Unlimited members
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;