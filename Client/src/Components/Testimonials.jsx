import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Ravi Sharma",
    role: "Family Historian",
    review:
      "This platform helped our entire family reconnect and preserve our history beautifully.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Mother of Three",
    review:
      "Building our family tree was simple and emotional. We discovered stories we never knew before.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Family Tree Enthusiast",
    review:
      "The clean design and secure system made us trust this platform completely.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
      
        <div className="testimonial-header">
          <span className="testimonial-label">TESTIMONIALS</span>
          <h2 className="testimonial-title">What Our Families Say</h2>
          <p className="testimonial-subtitle">
            Hear from families who are preserving their legacy with us.
          </p>
        </div>

  
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.id}>
              <FaQuoteLeft className="quote-icon" aria-hidden="true" />

              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>

              <p className="testimonial-review">"{item.review}"</p>

              <div className="testimonial-footer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="testimonial-image"
                  loading="lazy"
                />
                <div className="testimonial-author">
                  <h4 className="testimonial-name">{item.name}</h4>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;