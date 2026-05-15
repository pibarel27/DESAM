import React, { useState, useEffect } from "react";
import desam from "../img/desam.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";

const InnerHeader = ({ isAuth, setIsAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/auth/logout`,
        {},
        { withCredentials: true }
      );

      setIsAuth(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toTop = () => {
    scroll.scrollToTop({ duration: 0 });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" onClick={toTop} className="logo">
            <img src={desam} alt="DESAM" className="logo-img" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link className={isActive("/") ? "active" : ""} to="/">Home</Link>
            <Link className={isActive("/about") ? "active" : ""} to="/about">About</Link>
            <Link className={isActive("/services") ? "active" : ""} to="/services">Services</Link>
            <Link className={isActive("/careers") ? "active" : ""} to="/careers">Careers</Link>
            <Link className={isActive("/contact") ? "active" : ""} to="/contact">Contact</Link>

            {!isAuth && <Link to="/admin">Admin</Link>}

            {isAuth && (
              <>
                <Link to="/admin-dashboard">Dashboard</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* HAMBURGER */}
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

        {!isAuth && <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>}

        {isAuth && (
          <>
            <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        body {
          margin: 0;
          padding-top: 80px; /* FIX: prevents layout jump */
        }

        .header {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transition: 0.3s;
        }

        .sticky {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo-img {
          height: 45px;
        }

        .desktop-nav {
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }

        .desktop-nav a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: 0.2s;
        }

        .desktop-nav a:hover {
          background: rgba(13,110,253,0.08);
          color: #0d6efd;
        }

        /* FIX: no layout shift */
        .active {
          background: #0d6efd;
          color: #fff !important;
          font-weight: 500;
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
          transform: translateX(100%);
          transition: 0.3s;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu a {
          padding: 18px 30px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          color: #333;
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