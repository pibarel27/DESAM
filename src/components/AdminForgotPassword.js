import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [stage, setStage] = useState("request");
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState(0);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const startCountdown = () => {
    setCountdown(60);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email address.");
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setStage("verify");
    setStatus(`OTP sent to ${email}. Please enter the 6-digit code.`);
    setEnteredOtp("");
    startCountdown();

    // For demo purposes only: log OTP to console
    console.log("Admin OTP:", otp);
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!enteredOtp.trim()) {
      setStatus("Please enter the OTP.");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setStatus("OTP is incorrect. Please try again.");
      return;
    }

    setStatus("OTP verified. You can now log in with your password.");
    setTimeout(() => navigate("/admin"), 1200);
  };

  const handleResend = () => {
    if (countdown > 0) {
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setStatus(`A new OTP has been sent to ${email}.`);
    setEnteredOtp("");
    startCountdown();

    console.log("Resent Admin OTP:", otp);
  };

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [countdown]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Forgot Password</h1>
        <p style={styles.hint}>
          {stage === "request"
            ? "Enter your admin email address and we will send an OTP to verify your identity."
            : "Enter the 6-digit OTP sent to your email."}
        </p>

        {stage === "request" ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" style={styles.button}>
              Send OTP
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleVerify}>
              <div style={styles.emailHint}>OTP sent to: {email}</div>
              <input
                type="text"
                placeholder="Enter OTP"
                style={styles.input}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                maxLength={6}
                autoComplete="one-time-code"
              />
              <button type="submit" style={styles.button}>
                Enter
              </button>
            </form>
            <button
              type="button"
              onClick={handleResend}
              style={{
                ...styles.button,
                backgroundColor: countdown > 0 ? "#999" : "#0095f6",
                cursor: countdown > 0 ? "not-allowed" : "pointer",
              }}
              disabled={countdown > 0}
            >
              {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </button>
          </>
        )}

        <button type="button" onClick={() => navigate("/admin")} style={styles.secondaryButton}>
          Back to Login
        </button>

        {status && <div style={styles.status}>{status}</div>}
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
    lineHeight: 1.4,
  },
  emailHint: {
    fontSize: "13px",
    color: "#111",
    marginBottom: "10px",
    textAlign: "left",
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
    lineHeight: 1.4,
  },
};

export default AdminForgotPassword;
