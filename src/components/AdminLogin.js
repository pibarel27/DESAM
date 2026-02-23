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
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="form-control my-2"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control my-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;