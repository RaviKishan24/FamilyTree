import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaTree,
  FaUserFriends,
  FaShareAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import "./HowToUse.css";

const steps = [
  {
    number: "01",
    icon: <FaUserPlus />,
    title: "Create Your Account",
    text: "Sign up in seconds with your email. No credit card, no hidden fees — just a simple, secure start.",
    highlights: ["Free forever", "Email verification"],
  },
  {
    number: "02",
    icon: <FaTree />,
    title: "Add Your Root Person",
    text: "Start with yourself, a parent, or a grandparent. Enter name, gender, and date of birth to begin.",
    highlights: ["Quick form", "Unlimited trees"],
  },
  {
    number: "03",
    icon: <FaUserFriends />,
    title: "Build the Tree",
    text: "Add spouses, children, and extended family. Our builder keeps everything organized automatically.",
    highlights: ["Spouse linking", "Multi-generation"],
  },
  {
    number: "04",
    icon: <FaShareAlt />,
    title: "Share & Preserve",
    text: "Invite family members to view or contribute. Your tree stays private, secure, and always available.",
    highlights: ["Private by default", "Invite family"],
  },
];

function HowToUse() {
  return (
    <section className="how-section">
      <div className="how-container">
        <div className="how-header">
          <span className="how-label">HOW IT WORKS</span>
          <h2 className="how-title">
            Build Your Family Tree in 4 Simple Steps
          </h2>
          <p className="how-subtitle">
            From sign-up to sharing, our guided flow makes preserving your
            family history effortless — no technical skills required.
          </p>
        </div>

        <div className="how-steps">
          {steps.map((step, index) => (
            <div className="how-step" key={index}>
              {index < steps.length - 1 && (
                <div className="step-connector" aria-hidden="true" />
              )}

              <div className="step-number-badge">
                <span>{step.number}</span>
              </div>

              <div className="step-icon-wrap">{step.icon}</div>

              <div className="step-body">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>

                <ul className="step-highlights">
                  {step.highlights.map((highlight, i) => (
                    <li key={i}>
                      <FaCheckCircle className="highlight-icon" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="how-cta">
          <p className="how-cta-text">
            Ready to get started? Building your first family tree takes less
            than 5 minutes.
          </p>
          <Link to="/add-family" className="how-cta-btn">
            Start Building Now
            <FaArrowRight className="cta-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowToUse;