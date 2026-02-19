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
    setDropdownOpen(false);
  }, [location]);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
        setDropdownOpen(false);
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
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>

          <div
            className="mobile-dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Services <FaChevronDown size={12} />
          </div>

          <div className={`mobile-dropdown ${dropdownOpen ? "show" : ""}`}>
            <Link to="/web" onClick={() => setIsOpen(false)}>Web Development</Link>
            <Link to="/design" onClick={() => setIsOpen(false)}>UI/UX Design</Link>
            <Link to="/marketing" onClick={() => setIsOpen(false)}>Digital Marketing</Link>
          </div>

          <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <Link to="/AdminDashboard" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      </header>

      {/* Styles remain the same */}
      <style>{`
        body { margin:0; transition:0.3s ease; }
        body.dark-mode { background:#121212; color:white; }
        .header { position:fixed; width:100%; backdrop-filter:blur(15px); background:rgba(255,255,255,0.8); transition:all 0.3s ease; z-index:1000; }
        body.dark-mode .header { background:rgba(20,20,20,0.9); }
        .sticky { box-shadow:0 4px 20px rgba(0,0,0,0.15); padding:5px 0; }
        .nav-container { display:flex; justify-content:space-between; align-items:center; padding:15px 20px; transition:0.3s ease; }
        .logo-img { max-width:150px; max-height:50px; transition:0.3s ease; }
        .desktop-nav { display:flex; gap:25px; align-items:center; }
        .desktop-nav a { text-decoration:none; color:inherit; font-weight:500; transition:0.3s; }
        .desktop-nav a:hover { color:#0d6efd; }
        .active { color:#0d6efd; font-weight:bold; }
        .dropdown { position:relative; }
        .dropdown-menu { position:absolute; top:35px; left:0; min-width:180px; background:rgba(255,255,255,0.95); backdrop-filter:blur(15px); border-radius:8px; opacity:0; transform:translateY(10px); pointer-events:none; transition:0.3s ease; }
        body.dark-mode .dropdown-menu { background:rgba(20,20,20,0.95); }
        .dropdown:hover .dropdown-menu { opacity:1; transform:translateY(0); pointer-events:auto; }
        .dropdown-menu a { display:block; padding:12px 15px; }
        .dropdown-menu a:hover { background: rgba(13,110,253,0.1); }
        .nav-controls { display:flex; align-items:center; }
        .icon-btn { background:none; border:none; font-size:18px; cursor:pointer; margin-right:10px; }
        .hamburger { display:none; background:none; border:none; font-size:22px; cursor:pointer; }
        .mobile-menu { display:none; flex-direction:column; background:rgba(255,255,255,0.95); position:absolute; width:100%; top:80px; transform:translateY(-120%); transition:0.4s ease; }
        body.dark-mode .mobile-menu { background:rgba(20,20,20,0.95); }
        .mobile-menu.open { display:flex; transform:translateY(0); }
        .mobile-menu a, .mobile-dropdown-toggle { padding:15px; text-decoration:none; color:inherit; border-bottom:1px solid rgba(0,0,0,0.1); cursor:pointer; }
        .mobile-dropdown { max-height:0; overflow:hidden; flex-direction:column; background: rgba(0,0,0,0.05); transition:max-height 0.4s ease,padding 0.3s ease; }
        body.dark-mode .mobile-dropdown { background: rgba(255,255,255,0.05); }
        .mobile-dropdown.show { max-height:300px; display:flex; }
        .mobile-dropdown a { padding-left:30px; }
        @media (max-width:768px){ .desktop-nav{display:none;} .hamburger{display:block;} }
      `}</style>
    </>
  );
};

export default InnerHeader;
