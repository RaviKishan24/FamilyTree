import React from 'react'
import banner2 from "../assets/banner2.jpg"
import "./Home.css"
import RecentlyAddedFamilies from '../Components/RecentlyAddedFamilies'
import Testimonials from '../Components/Testimonials'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className='banner-container'> <img className='banner' src={banner2} alt="" />
      </div>
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
            <div className="feature-item">✔ Easy Tree Creation</div>
            <div className="feature-item">✔ Secure & Private</div>
            <div className="feature-item">✔ Multi-Generation Support</div>
          </div>

          <Link to="/add-family">
            <button className="add-family-btn">Start Building Now</button>
          </Link>
           
          </div>
      </section>
      <RecentlyAddedFamilies />
      <Testimonials />

    </div>


  )
}

export default Home
