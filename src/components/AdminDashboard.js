import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check authentication on load
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth") === "true";
    setIsAuth(auth);
  }, []);

  // 🔐 Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  // 🚪 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
    navigate("/");
  };

  // ======================
  // 🖥 LOGIN VIEW
  // ======================
  if (!isAuth) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <h2>Admin Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ======================
  // 🛠 DASHBOARD VIEW
  // ======================
  return (
    <div style={styles.dashboard}>
      <div style={styles.sidebar}>
        <h3>Admin Panel</h3>
        <button style={styles.sideBtn}>Edit Posts</button>
        <button style={styles.sideBtn}>Edit Team</button>
        <button style={styles.sideBtn}>Edit Content</button>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.main}>
        <h2>Editable Dashboard Mode</h2>
        <p>
          You are logged in as Admin.  
          Here you can edit posts, upload photos, update team members,
          and manage educational content.
        </p>

        {/* Your Editable Components Go Here */}
      </div>
    </div>
  );
}

export default AdminPage;


// ======================
// 🎨 Simple Styling
// ======================
const styles = {
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  loginBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#222",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  dashboard: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "250px",
    background: "#222",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  sideBtn: {
    margin: "10px 0",
    padding: "10px",
    background: "#444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "40px",
  },
};
