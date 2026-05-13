import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setIsAuth }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);
      navigate("/AdminDashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Admin Panel</h1>
        <p style={styles.hint}>Sign in to open the dashboard. No server is required in this branch.</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    backgroundColor: "#fff",
    padding: "40px",
    border: "1px solid #dbdbdb",
    borderRadius: "8px",
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
    marginBottom: "12px",
  },
  hint: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px",
    lineHeight: 1.4,
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #dbdbdb",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0095f6",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
};

export default AdminLogin;
