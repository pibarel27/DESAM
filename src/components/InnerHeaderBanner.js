import React, { useState, useEffect, useRef } from "react";
import desam from "../img/desam.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const InnerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const splitLocation = location.pathname.split("/");
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Auto close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
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

            <Link
              to="/services"
              className={splitLocation[1] === "services" ? "active" : ""}
            >
              Services
            </Link>

            <Link
              to="/careers"
              className={splitLocation[1] === "careers" ? "active" : ""}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={splitLocation[1] === "contact" ? "active" : ""}
            >
              Contact Us
            </Link>

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
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <Link to="/AdminDashboard" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      </header>
    </>
  );
};

export default InnerHeader;
