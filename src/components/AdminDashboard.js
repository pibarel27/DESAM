import { useNavigate } from "react-router-dom";

function AdminDashboard({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;