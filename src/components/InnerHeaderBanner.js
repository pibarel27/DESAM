import React, { useState, useEffect, useRef } from "react";
import desam from "../img/desam.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaChevronDown } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const InnerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  // Ref for the whole header
  const headerRef = useRef(null);

  const toTop = () => {
    scroll.scrollToTop({ duration: 0 });
    setIsOpen(false);
  };

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Auto close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="nav-container">
          <Link to="/" onClick={toTop}>
            <img src={desam} alt="DESAM" className="logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <Link to="/" className={splitLocation[1] === "" ? "active" : ""}>
              Home
            </Link>
            <Link
              to="/about"
              className={splitLocation[1] === "about" ? "active" : ""}
            >
              About Us
            </Link>

            {/* Dropdown */}
            <div className="dropdown">
              <Link to="/services">
                Services <FaChevronDown size={12} />
              </Link>
              <div className="dropdown-menu">
                <Link to="/web">Web Development</Link>
                <Link to="/design">UI/UX Design</Link>
                <Link to="/marketing">Digital Marketing</Link>
              </div>
            </div>

            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/AdminDashboard">Admin</Link>
            
          </nav>

          <div className="nav-controls">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>

          <div
            className="mobile-dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Services <FaChevronDown size={12} />
          </div>

          <div className={`mobile-dropdown ${dropdownOpen ? "show" : ""}`}>
            <Link to="/web">Web Development</Link>
            <Link to="/design">UI/UX Design</Link>
            <Link to="/marketing">Digital Marketing</Link>
          </div>

          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </header>

      {/* ... your existing CSS ... */}
    </>
  );
};

export default InnerHeader;
