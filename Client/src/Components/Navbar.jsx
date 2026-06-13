import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaSearch, FaUser, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const user=useSelector((state)=>state.user.user);
  const isAuthenticated= useSelector((state)=>state.user.isAuthenticated);
  console.log("user is : ",user)
    console.log("isauthenticated : ",isAuthenticated)

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <nav className="navbar">
   
      <Link
        to="/"
        className={`logo-wrapper ${
          showSearch ? "mobile-hide" : ""
        }`}
      >
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Link>

      <form
        className={`search-container ${
          showSearch ? "mobile-search-active" : ""
        }`}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search family..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" className="search-icon">
          <FaSearch />
        </button>

        <button
          type="button"
          className="close-search"
          onClick={() => setShowSearch(false)}
        >
          <FaTimes />
        </button>
      </form>

      {!showSearch && (
        <button
          className="mobile-search-btn"
          onClick={() => setShowSearch(true)}
        >
          <FaSearch />
        </button>
      )}

      
      <Link
        to="/LoginSignup"
        className={showSearch ? "mobile-hide" : ""}
      >
        <div className="user-section">
          <FaUser className="user-icon" />
          <span>Login</span>
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;