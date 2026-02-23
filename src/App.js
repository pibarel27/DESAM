import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const Home = lazy(() => import("./ui/Home"));
const Career = lazy(() => import("./ui/Career"));
const Contact = lazy(() => import("./ui/Contact"));
const About = lazy(() => import("./ui/About"));
const Service = lazy(() => import("./ui/Service"));

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const AdminLogin = lazy(() => import("./components/AdminLogin")); // ✅ NEW

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("adminAuth");
    if (admin === "true") {
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* Public Routes */}   
          <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} /> 
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service />} />
          <Route path="careers" element={<Career />} />
          <Route path="contact" element={<Contact />} />

          {/* ✅ Admin Login Page */}
          <Route
            path="admin"
            element={<AdminLogin setIsAuth={setIsAuth} />}
          />

          {/* 🔐 Protected Dashboard */}
          <Route
            path="AdminDashboard"
            element={
              isAuth ? (
                <AdminDashboard setIsAuth={setIsAuth} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;