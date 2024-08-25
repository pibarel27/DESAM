import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const menuRef = useRef(null);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    transition: 'width 0.3s ease-in-out',
    margin: '0 auto'
  };

  const sectionStyle = {
    width: isOpen ? '90%' : '100%', // Narrower section width when open
    transition: 'width 0.3s ease-in-out',
    margin: '0 auto',
    padding: '0 10px', // Reduce padding when menu is open
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '60px', // Adjust based on your navbar height
    right: 0,
    width: '100%',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out',
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    fontSize: isOpen ? '14px' : '18px', // Smaller font size when open
  };

  const navLinkStyle = {
    padding: '10px',
    textDecoration: 'none',
    color: '#333',
  };

  const activeStyle = {
    fontWeight: 'bold',
    color: '#007BFF',
  };

  const hamburgerStyle = {
    display: 'block', // Show hamburger button on small screens
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    margin: '10px'
  };

  // Adjust styles based on screen size
  const mediaQuery = window.matchMedia('(width: 60px)');
  if (mediaQuery.matches) {
    // Mobile screen styles
  }

  return (
    <nav id="navbar" style={navbarStyle}>
      <button style={hamburgerStyle} onClick={toggleMenu}>
        ☰
      </button>
      <section style={sectionStyle}>
        <ul ref={menuRef} style={navLinksStyle}>
          <li>
            <Link to="/" style={{ ...navLinkStyle, ...(splitLocation[1] === "" ? activeStyle : {}) }}>Home</Link>
          </li>
          <li>
            <Link to="/about" style={{ ...navLinkStyle, ...(splitLocation[1] === "about" ? activeStyle : {}) }}>About Us</Link>
          </li>
          <li>
            <Link to="/services" style={{ ...navLinkStyle, ...(splitLocation[1] === "services" ? activeStyle : {}) }}>Services</Link>
          </li>
          <li>
            <Link to="/careers" style={{ ...navLinkStyle, ...(splitLocation[1] === "careers" ? activeStyle : {}) }}>Careers</Link>
          </li>
          <li>
            <Link to="/contact" style={{ ...navLinkStyle, ...(splitLocation[1] === "contact" ? activeStyle : {}) }}>Contact Us</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
