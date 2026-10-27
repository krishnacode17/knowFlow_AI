
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  // Temporary state — baad mein AuthContext se aayegi
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
 