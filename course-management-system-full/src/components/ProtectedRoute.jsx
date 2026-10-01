import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <section className="page"><div className="state-box">RESTORING YOUR SESSION...</div></section>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (adminOnly && user.role !== "Admin") {
    return <Navigate to="/courses" replace />;
  }

  return <Outlet />;
}
