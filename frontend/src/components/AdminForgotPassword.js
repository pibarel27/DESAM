import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AdminForgotPassword() {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [stage, setStage] = useState("request"); 
  const [loading, setLoading] = useState(false);

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${backendUrl}/api/admin/auth/forgot-password`, {
        email,
      });

      toast.success(res.data.message || "OTP sent to your email");      

      setStage("verify");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${backendUrl}/api/admin/auth/reset-password`, {
        email,
        otp,
        password,
      });

      toast.success(res.data.message || "Password reset successful");


      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP or error");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/admin/auth/resend-otp`, {
        email,
      });

      toast.success(res.data.message || "OTP resent successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error resending OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Forgot Password</h1>

        <p style={styles.hint}>
          {stage === "request"
            ? "Enter your email to receive OTP"
            : "Enter OTP and new password"}
        </p>

        {/* STEP 1 */}
        {stage === "request" && (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button style={styles.button} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {stage === "verify" && (
          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              placeholder="Enter OTP"
              style={styles.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button style={styles.button} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => navigate("/admin")}
          style={styles.secondaryButton}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
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
  secondaryButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    border: "1px solid #0095f6",
    color: "#0095f6",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  status: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
};

export default AdminForgotPassword;