import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRouters = () => {
  const { token, isLibrarian, loading } = useAuth();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  if (!isLibrarian) {
    return <div>you are not librarian </div>;
  }
  return <Outlet />;
};

export default ProtectedRouters;
