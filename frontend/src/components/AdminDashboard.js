import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminDashboard({ setIsAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
    navigate("/");
  }, [navigate, setIsAuth]);

  return null; // explicitly return nothing
}

export default AdminDashboard;
