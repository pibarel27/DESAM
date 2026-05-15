import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin({ setIsAuth }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleForgotPassword = () => {
    navigate("/admin/forgot-password");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);

      toast.success("Admin login successful");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Admin Panel</h1>
        <p style={styles.hint}>Login to access dashboard</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.forgotText}>
          <button
            type="button"
            onClick={handleForgotPassword}
            style={styles.linkButton}
          >
            Forgot Password?
          </button>
        </p>
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
    marginBottom: "10px",
  },
  hint: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px",
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
  },
  forgotText: {
    marginTop: "10px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#0095f6",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
    padding: 0,
  },
};

export default AdminLogin;
