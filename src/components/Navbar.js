import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);

  const splitLocation = location.pathname.split("/");

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  /* Lock body scroll when mobile open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
     <style>{`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #ffffff;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
  }

  .logo {
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    color: #000;
  }

  .nav-links {
    display: flex;
    gap: 25px;
    list-style: none;
  }

  .nav-links li {
    position: relative;
  }

  .nav-links a {
    text-decoration: none;
    color: #333;
    transition: 0.3s ease;
  }

  .nav-links a:hover {
    color: #0d6efd;
  }

  .active {
    font-weight: bold;
    color: #0d6efd !important;
  }

  /* Desktop Dropdown */
  .dropdown-menu {
    position: absolute;
    top: 45px;
    left: 0;
    min-width: 180px;
    background: #ffffff;
    border: 1px solid #eee;
    border-radius: 6px;
    overflow: hidden;
    display: none;
  }

  .nav-links li:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu a {
    display: block;
    padding: 12px 15px;
  }

  .dropdown-menu a:hover {
    background: #f2f2f2;
  }

  .hamburger {
    display: none;
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.3);
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease;
    z-index: 900;
  }

  .overlay.show {
    opacity: 1;
    visibility: visible;
  }

  /* Mobile Menu */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 80%;
    max-width: 320px;
    background: #ffffff;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    border-left: 1px solid #eee;
    z-index: 1001;
  }

  .mobile-menu.open {
    transform: translateX(0);
  }

  .mobile-menu a, .mobile-toggle {
    padding: 15px 20px;
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }

  .mobile-menu a:hover {
    background: #f2f2f2;
  }

  .mobile-dropdown {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .mobile-dropdown.show {
    max-height: 300px;
  }

  .mobile-dropdown a {
    padding-left: 35px;
  }

  .rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .hamburger {
      display: block;
    }
  }
`}</style>  

      <nav ref={navbarRef} className="navbar">
        <div className="container">
          <Link to="/" className="logo">DESAM</Link>

          <ul className="nav-links">
            <li>
              <Link to="/" className={splitLocation[1] === "" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={splitLocation[1] === "about" ? "active" : ""}>About</Link>
            </li>
            <li>
              <Link to="/services">
                Services <FaChevronDown size={12} />
              </Link>
              <div className="dropdown-menu">
                <Link to="/web">Web Development</Link>
                <Link to="/design">UI/UX Design</Link>
                <Link to="/marketing">Digital Marketing</Link>
              </div>
            </li>
            <li>
              <Link to="/contact" className={splitLocation[1] === "contact" ? "active" : ""}>Contact</Link>
            </li>
            <li>
              <Link to="/AdminDashboard" className={splitLocation[1] === "AdminDashboard" ? "active" : ""}>Admin</Link>
            </li>
          </ul>

          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Overlay */}
        <div
          className={`overlay ${isOpen ? "show" : ""}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

          <div
            className="mobile-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Services{" "}
            <FaChevronDown
              size={12}
              className={dropdownOpen ? "rotate" : ""}
            />
          </div>

          <div className={`mobile-dropdown ${dropdownOpen ? "show" : ""}`}>
            <Link to="/web" onClick={() => setIsOpen(false)}>Web Development</Link>
            <Link to="/design" onClick={() => setIsOpen(false)}>UI/UX Design</Link>
            <Link to="/marketing" onClick={() => setIsOpen(false)}>Digital Marketing</Link>
          </div>

          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/AdminDashboard" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;