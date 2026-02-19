import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sidebarRef = useRef();
  const dropdownRef = useRef();

  // 🔐 FRONTEND LOGIN ONLY
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // close sidebar on mobile
    setDropdownOpen(false); // close dropdown when selecting submenu
  };

  // Close sidebar/dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <>
        <style>{styles}</style>
        <div className="login-wrapper">
          <div className="glass-card">
            <h3>Admin Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="admin-layout">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
          <h4 className="logo">DESAM Admin</h4>

          <button onClick={() => handleMenuClick("dashboard")}>
            <FaTachometerAlt /> Dashboard
          </button>

          {/* Animated Dropdown */}
          <div ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaHome /> Homepage <FaChevronDown />
            </button>

            <div className={`submenu ${dropdownOpen ? "show" : ""}`}>
              <button onClick={() => handleMenuClick("banner")}>
                Edit Banner
              </button>
              <button onClick={() => handleMenuClick("news")}>
                Manage News
              </button>
            </div>
          </div>

          <button onClick={() => handleMenuClick("profile")}>
            <FaUser /> Profile
          </button>

          <button onClick={handleLogout} className="logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {sidebarOpen && (
          <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Content */}
        <div className="content">
          <div className="topbar">
            <button
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
          </div>

          <div className="glass-card content-card">
            <h2>{activeSection.toUpperCase()}</h2>
            <p>Modern CMS Interface Content Here...</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = `
body {
  margin: 0;
  font-family: Arial;
  background: #f4f6f9;
}

/* Layout */
.admin-layout {
  display: flex;
}

/* Sidebar */
.sidebar {
  width: 260px;
  height: 100vh;
  backdrop-filter: blur(15px);
  background: rgba(13,110,253,0.75);
  color: white;
  position: fixed;
  left: -260px;
  transition: 0.3s;
  padding: 20px;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

.sidebar button {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  padding: 10px;
  text-align: left;
  margin-bottom: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.sidebar button:hover {
  background: rgba(255,255,255,0.2);
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: 0.3s ease;
}

.submenu.show {
  max-height: 200px;
}

.submenu button {
  padding-left: 30px;
}

.logout {
  background: rgba(220,53,69,0.8);
}

/* Content */
.content {
  width: 100%;
}

@media(min-width:768px){
  .sidebar { left: 0; }
  .content { margin-left: 260px; }
  .hamburger { display:none; }
  .overlay { display:none; }
}

.topbar {
  display:flex;
  justify-content: space-between;
  padding:15px;
}

.hamburger {
  background:#0d6efd;
  color:white;
  border:none;
  padding:8px 12px;
  border-radius:8px;
  cursor:pointer;
}

/* Glass Effect */
.glass-card {
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.25);
  padding:30px;
  border-radius:15px;
  margin:30px;
  box-shadow:0 8px 32px rgba(0,0,0,0.2);
}

/* Login */
.login-wrapper {
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

.login-wrapper input {
  width:100%;
  padding:10px;
  margin-bottom:10px;
  border-radius:8px;
  border:none;
}

.login-wrapper button {
  width:100%;
  padding:10px;
  border:none;
  border-radius:8px;
  background:#0d6efd;
  color:white;
}
`;

export default AdminDashboard;
