import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Ravi Sharma",
    review:
      "This platform helped our entire family reconnect and preserve our history beautifully.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Verma",
    review:
      "Building our family tree was simple and emotional. We discovered stories we never knew before.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Singh",
    review:
      "The clean design and secure system made us trust this platform completely.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-title">What Our Families Say</h2>
        <p className="testimonial-subtitle">
          Hear from families who are preserving their legacy with us.
        </p>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="testimonial-image"
              />

              <p className="testimonial-review">“{item.review}”</p>

              <div className="stars">⭐⭐⭐⭐⭐</div>

              <h4 className="testimonial-name">— {item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;