
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  // Temporary state — baad mein AuthContext se aayegi
  const isAuthenticated = true;

  const location = useLocation();

  console.log(location.pathname);
  console.log(location.search);
  console.log(location.state);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
