import React from "react";
import "./RecentlyAddedFamilies.css";
import families from "./test";



const RecentlyAddedFamilies = () => {
  return (
    <section className="recent-section">
      <div className="recent-container">
        <h2 className="section-title">Recently Added Families</h2>
        <p className="section-subtitle">
          Explore the newest family trees created by our community.
        </p>

        <div className="family-grid">
          {families.map((family) => (
            <div className="family-card" key={family.id}>
              <img
                src={family.image}
                alt={family.name}
                className="family-image"
              />

              <div className="family-content">
                <h3 className="family-name">{family.name}</h3>

                <p className="family-info">
                  {family.generations} Generations • {family.members} Members
                </p>

                <p className="created-by">
                  Created by: <span>{family.createdBy}</span>
                </p>

                <button className="view-btn">View Tree</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedFamilies;