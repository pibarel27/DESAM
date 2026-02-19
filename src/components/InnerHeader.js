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
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            <Link to="/" className={splitLocation[1] === "" ? "active" : ""}>Home</Link>
            <Link to="/about" className={splitLocation[1] === "about" ? "active" : ""}>About Us</Link>
            <Link to="/services" className={splitLocation[1] === "services" ? "active" : ""}>Services</Link>
            <Link to="/careers" className={splitLocation[1] === "careers" ? "active" : ""}>Careers</Link>
            <Link to="/contact" className={splitLocation[1] === "contact" ? "active" : ""}>Contact Us</Link>
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

      <style>{`
  body { margin:0; transition:0.3s ease; }
  body.dark-mode { background:#121212; color:white; }
  body.menu-open { overflow: hidden; }

  .header {
    position:fixed;
    width:100%;
    backdrop-filter:blur(15px);
    background:rgba(255,255,255,0.8);
    transition:all 0.3s ease;
    z-index:1000;
  }

  body.dark-mode .header {
    background:rgba(20,20,20,0.9);
  }

  .sticky {
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    padding:5px 0;
  }

  .nav-container {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 20px;
  }

  .logo-img {
    max-width:150px;
    max-height:50px;
  }

  .desktop-nav {
    display:flex;
    gap:25px;
    align-items:center;
  }

  .desktop-nav a {
    text-decoration:none;
    color:inherit;
    font-weight:500;
    transition:0.3s;
  }

  .desktop-nav a:hover {
    color:#0d6efd;
  }

  .active {
    color:#0d6efd;
    font-weight:bold;
  }

  .nav-controls {
    display:flex;
    align-items:center;
  }

  .icon-btn {
    background:none;
    border:none;
    font-size:18px;
    cursor:pointer;
    margin-right:10px;
  }

  .hamburger {
    display:none;
    background:none;
    border:none;
    font-size:22px;
    cursor:pointer;
  }

  /* Overlay */
  .overlay {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.4);
    opacity:0;
    visibility:hidden;
    transition:0.3s ease;
    z-index:900;
  }

  .overlay.show {
    opacity:1;
    visibility:visible;
  }

  /* Animated Mobile Menu */
  .mobile-menu {
    position:fixed;
    top:0;
    right:0;
    width:270px;
    height:100vh;
    background:rgba(255,255,255,0.98);
    backdrop-filter:blur(20px);
    display:flex;
    flex-direction:column;
    padding-top:90px;
    transform:translateX(100%);
    transition:transform 0.4s cubic-bezier(.77,0,.18,1);
    box-shadow:-10px 0 30px rgba(0,0,0,0.1);
    z-index:1001;
  }

  body.dark-mode .mobile-menu {
    background:rgba(20,20,20,0.98);
  }

  .mobile-menu.open {
    transform:translateX(0);
  }

  /* Stagger Animation */
  .mobile-menu a {
    padding:18px 25px;
    text-decoration:none;
    color:inherit;
    opacity:0;
    transform:translateX(20px);
    transition:all 0.4s ease;
  }

  .mobile-menu.open a {
    opacity:1;
    transform:translateX(0);
  }

  .mobile-menu.open a:nth-child(1) { transition-delay:0.1s; }
  .mobile-menu.open a:nth-child(2) { transition-delay:0.15s; }
  .mobile-menu.open a:nth-child(3) { transition-delay:0.2s; }
  .mobile-menu.open a:nth-child(4) { transition-delay:0.25s; }
  .mobile-menu.open a:nth-child(5) { transition-delay:0.3s; }
  .mobile-menu.open a:nth-child(6) { transition-delay:0.35s; }

  .mobile-menu a:hover {
    background:rgba(13,110,253,0.1);
  }

  @media (max-width:768px){
    .desktop-nav{display:none;}
    .hamburger{display:block;}
  }
`}</style>

    </>
  );
};

export default InnerHeader;
