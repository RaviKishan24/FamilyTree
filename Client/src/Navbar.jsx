import React, { useState } from "react";
import "./Navbar.css";
import logo from "./assets/logo.png";
import { FaSearch, FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <>
      <nav className="navbar">
      
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>

      
        <form className="search-container" onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Search family..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-icon">
            <FaSearch />
          </button>

        </form>


        <Link to={'/LoginSignup'}>
        <div className="user-section">
          <FaUser className="user-icon" />
          <span>Login</span>
        </div></Link>
      </nav>

    
    </>
  );
}

export default Navbar;