import React, { useState, useEffect, useRef } from "react";
import desam from "../img/desam.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const InnerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const splitLocation = location.pathname.split("/");
  const headerRef = useRef(null);

  /* ✅ Check admin login */
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    setIsAuth(authStatus === "true");
  }, [location]);

  /* ✅ Logout */
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
    navigate("/AdminDashboard");
  };

  const toTop = () => {
    scroll.scrollToTop({ duration: 0 });
    setIsOpen(false);
  };

  /* Sticky Header */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  /* Close if clicked outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
            <Link to="/about" className={splitLocation[1] === "about" ? "active" : ""}>
              About Us
            </Link>
            <Link to="/services" className={splitLocation[1] === "services" ? "active" : ""}>
              Services
            </Link>
            <Link to="/careers" className={splitLocation[1] === "careers" ? "active" : ""}>
              Careers
            </Link>
            <Link to="/contact" className={splitLocation[1] === "contact" ? "active" : ""}>
              Contact Us
            </Link>

            {!isAuth && <Link to="/AdminDashboard">Admin</Link>}

            {isAuth && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </nav>

          {/* Controls */}
          <div className="nav-controls">
            

            <button
              className="hamburger"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>

        {!isAuth && (
          <Link to="/AdminDashboard" onClick={() => setIsOpen(false)}>
            Admin
          </Link>
        )}

        {isAuth && (
          <button
            onClick={handleLogout}
            style={{
              padding: "18px 25px",
              background: "red",
              color: "#fff",
              border: "none",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default InnerHeader;