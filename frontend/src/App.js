import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from 'react-toastify';
import axios from "axios";

import InnerHeader from "./components/InnerHeader";
import Footer from "./components/Footer";

const Home = lazy(() => import("./ui/Home"));
const Career = lazy(() => import("./ui/Career"));
const Contact = lazy(() => import("./ui/Contact"));
const About = lazy(() => import("./ui/About"));
const Service = lazy(() => import("./ui/Service"));

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const AdminLogin = lazy(() => import("./components/AdminLogin"));
const AdminForgotPassword = lazy(() => import("./components/AdminForgotPassword"));

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/auth/me`,
          { withCredentials: true }
        );
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Suspense fallback={<div>Loading...</div>}>

        {/* PUBLIC LAYOUT WRAPPER */}
        <InnerHeader isAuth={isAuth} setIsAuth={setIsAuth} />

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes (NO HEADER/FOOTER HERE) */}
          <Route path="/admin" element={<AdminLogin setIsAuth={setIsAuth} />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route
            path="/admin-dashboard"
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

        <Footer />

      </Suspense>
    </Router>
  );
}

export default App;