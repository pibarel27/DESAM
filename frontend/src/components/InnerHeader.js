import React, { useState, useEffect } from "react";
import desam from "../img/desam.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const InnerHeader = ({ isAuth, setIsAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  // ✅ Check login status on load
 

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
  };

  const toTop = () => {
    scroll.scrollToTop({ duration: 0 });
    setIsOpen(false);
  };

  // Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" onClick={toTop}>
            <img src={desam} alt="DESAM" className="logo-img" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link to="/" className={splitLocation[1] === "" ? "active" : ""}>Home</Link>
            <Link to="/about" className={splitLocation[1] === "about" ? "active" : ""}>About Us</Link>
            <Link to="/services" className={splitLocation[1] === "services" ? "active" : ""}>Services</Link>
            <Link to="/careers" className={splitLocation[1] === "careers" ? "active" : ""}>Careers</Link>
            <Link to="/contact" className={splitLocation[1] === "contact" ? "active" : ""}>Contact Us</Link>

            {!isAuth && <Link to="/AdminDashboard">Admin</Link>}

            {isAuth && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </nav>

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </header>

      {/* MOBILE MENU */}
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
              padding: "18px 30px",
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

      <style>{`
        body {
          margin: 0;
        }

        .header {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          transition: 0.3s ease;
          z-index: 1000;
        }

        .sticky {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .nav-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo-img {
          height: 45px;
          object-fit: contain;
        }

        .desktop-nav {
          display: flex;
          gap: 25px;
          align-items: center;
        }

        .desktop-nav a {
          text-decoration: none;
          color: inherit;
          font-weight: 500;
          transition: 0.3s;
        }

        .desktop-nav a:hover,
        .active {
          color: #0d6efd;
          font-weight: 600;
        }

        .logout-btn {
          background: red;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .hamburger {
          display: none;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          padding-top: 90px;
          box-shadow: -5px 0 20px rgba(0,0,0,0.1);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(.77,0,.18,1);
          z-index: 1001;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu a {
          padding: 18px 30px;
          text-decoration: none;
          color: inherit;
          font-size: 18px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: 0.3s ease;
        }

        .mobile-menu a:hover {
          background: rgba(13,110,253,0.1);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default InnerHeader;