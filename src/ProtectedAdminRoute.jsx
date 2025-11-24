import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const admin = localStorage.getItem("learnifyAdmin");

  if (!admin) return <Navigate to="/admin" replace />;

  return children;
}
