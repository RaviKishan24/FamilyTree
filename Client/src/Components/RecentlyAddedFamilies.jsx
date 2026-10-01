import React from "react";
import { Link } from "react-router-dom";
import {
  FaTree,
  FaUsers,
  FaUserCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./RecentlyAddedFamilies.css";
import families from "../test";

const RecentlyAddedFamilies = () => {
  return (
    <section className="recent-section">
      <div className="recent-container">
  
        <div className="recent-header">
          <span className="recent-label">COMMUNITY TREES</span>
          <h2 className="section-title">Recently Added Families</h2>
          <p className="section-subtitle">
            Explore the newest family trees created by our community.
          </p>
        </div>

   
        <div className="family-grid">
          {families.map((family) => (
            <article className="family-card" key={family.id}>
              <div className="family-image-wrap">
                <img
                  src={family.image}
                  alt={family.name}
                  className="family-image"
                  loading="lazy"
                />
                <span className="family-badge">
                  <FaTree className="badge-icon" />
                  New
                </span>
              </div>

              <div className="family-content">
                <h3 className="family-name">{family.name}</h3>

                <div className="family-meta">
                  <span className="meta-item">
                    <FaTree className="meta-icon" />
                    {family.generations} Generations
                  </span>
                  <span className="meta-dot">•</span>
                  <span className="meta-item">
                    <FaUsers className="meta-icon" />
                    {family.members} Members
                  </span>
                </div>

                <p className="created-by">
                  <FaUserCircle className="created-icon" />
                  Created by <span>{family.createdBy}</span>
                </p>

                <Link
                  to={`/family/${family.id}`}
                  className="view-btn"
                >
                  View Tree
                  <FaArrowRight className="view-arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedFamilies;