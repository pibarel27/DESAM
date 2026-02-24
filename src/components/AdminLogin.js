import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin({ setIsAuth }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // ⏳ Countdown Timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  // 🔥 Send OTP ONLY once when forgot clicked
  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/send-otp");
      setTimer(300);
      setShowForgot(true);
      alert("OTP sent to registered email");
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
 const verifyOtp = async () => {
  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/verify-otp",
      {
        email: "allindiaradioimphal3@gmail.com", // MUST match backend
        otp: otp
      }
    );

    if (res.data.success) {
      setVerified(true);
      alert("OTP Verified Successfully");
    } else {
      alert(res.data.message || "Invalid OTP");
    }

  } catch (error) {
    console.error(error);
    alert("Verification failed");
  } finally {
    setLoading(false);
  }
};

  // 🔐 Reset Password
  const resetPassword = () => {
    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    alert("Password reset successful!");
    setShowForgot(false);
    setVerified(false);
    setOtp("");
    setNewPassword("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };


  
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Admin Panel</h1>

        {!showForgot ? (
          <>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                style={styles.input}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={styles.button}>Log In</button>
            </form>

            <p style={styles.forgot} onClick={handleForgotPassword}>
              {loading ? "Sending OTP..." : "Forgot password?"}
            </p>
          </>
        ) : (
          <>
            {!verified ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  style={styles.input}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {timer > 0 && (
                  <p style={{ fontSize: 12, color: "gray" }}>
                    Expires in: {formatTime(timer)}
                  </p>
                )}

                <button
                  style={styles.button}
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  style={styles.input}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button style={styles.button} onClick={resetPassword}>
                  Reset Password
                </button>
              </>
            )}
          </>
        )}
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
    maxWidth: "350px",
    backgroundColor: "#fff",
    padding: "40px",
    border: "1px solid #dbdbdb",
    borderRadius: "8px",
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
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
  forgot: {
    fontSize: "12px",
    color: "#00376b",
    cursor: "pointer",
  },
};

export default AdminLogin;