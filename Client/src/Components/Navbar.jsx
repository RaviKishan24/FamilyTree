import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userThunk";

import LogoutModal from "./LogoutModal";
import "./Navbar.css";
import logo from "../assets/logo.png";
import {
  FaSearch,
  FaUser,
  FaTimes,
  FaBars,
  FaChevronDown,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
  FaHome,
  FaTree,
  FaInfoCircle,
} from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".mobile-menu-toggle")
      ) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setShowSearch(false);
    }
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearch("");
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      setIsLoggingOut(true);

      const result = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(result)) {
        toast.success("Logged out successfully");
      } else {
        toast.error(result.payload || "Logout failed");
      }

      setShowLogoutModal(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong while logging out");
      setShowLogoutModal(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <header className="navbar">
      <div className={`navbar-inner ${showSearch ? "search-mode" : ""}`}>
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" aria-label="Home">
            <img src={logo} alt="Family Tree" className="navbar-logo" />
          </Link>

          <nav className="navbar-links" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <FaHome className="nav-link-icon" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/families"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <FaTree className="nav-link-icon" />
              <span>Family Trees</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <FaInfoCircle className="nav-link-icon" />
              <span>About</span>
            </NavLink>
            <NavLink
              to="/howtouse"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <FaCircleQuestion className="nav-link-icon" />
              <span>How to use</span>
            </NavLink>
          </nav>
        </div>

        <form
          className={`navbar-search ${showSearch ? "search-active" : ""}`}
          onSubmit={handleSearch}
          role="search"
        >
          <FaSearch className="search-icon-left" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search family, member, tree..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
            autoFocus={showSearch}
          />
          <button
            type="submit"
            className="search-submit"
            aria-label="Submit search"
          >
            <FaSearch />
          </button>
          <button
            type="button"
            className="search-close"
            onClick={handleCloseSearch}
            aria-label="Close search"
          >
            <FaTimes />
          </button>
        </form>

        <div className="navbar-right">
          <button
            type="button"
            className="icon-btn mobile-search-toggle"
            onClick={() => setShowSearch(true)}
            aria-label="Open search"
          >
            <FaSearch />
          </button>

          {isAuthenticated ? (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button
                type="button"
                className="user-trigger"
                onClick={() => setShowUserMenu((v) => !v)}
                aria-haspopup="true"
                aria-expanded={showUserMenu}
              >
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || "User"} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <span className="user-name">
                  {user?.name?.split(" ")[0] || "Profile"}
                </span>
                <FaChevronDown
                  className={`user-chevron ${showUserMenu ? "rotated" : ""}`}
                />
              </button>

              {showUserMenu && (
                <div className="user-dropdown" role="menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      <FaUser />
                    </div>
                    <div className="dropdown-user-info">
                      <p className="dropdown-name">{user?.name || "User"}</p>
                      <p className="dropdown-email">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FaUserCircle className="dropdown-icon" />
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FaCog className="dropdown-icon" />
                    Settings
                  </Link>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item dropdown-logout"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/LoginSignup" className="login-btn">
              <FaUser className="login-icon" />
              <span>Login/Signup</span>
            </Link>
          )}

          <button
            type="button"
            className="icon-btn mobile-menu-toggle"
            onClick={() => setShowMobileMenu((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-drawer ${showMobileMenu ? "open" : ""}`}
        ref={mobileMenuRef}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `drawer-link ${isActive ? "active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <FaHome className="drawer-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/families"
          className={({ isActive }) =>
            `drawer-link ${isActive ? "active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <FaTree className="drawer-icon" />
          <span>Family Trees</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `drawer-link ${isActive ? "active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <FaInfoCircle className="drawer-icon" />
          <span>About</span>
        </NavLink>
        <NavLink
          to="/howtouse"
          className={({ isActive }) =>
            `drawer-link ${isActive ? "active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <FaCircleQuestion className="drawer-icon" />
          <span>How to use</span>
        </NavLink>

        {isAuthenticated && (
          <button
            type="button"
            className="drawer-link drawer-logout"
            onClick={() => {
              closeMobileMenu();
              handleLogout();
            }}
          >
            <FaSignOutAlt className="drawer-icon" />
            <span>Logout</span>
          </button>
        )}
      </div>

      {showMobileMenu && (
        <div className="mobile-overlay" onClick={closeMobileMenu} />
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        isLoading={isLoggingOut}
      />
    </header>
  );
}

export default Navbar;