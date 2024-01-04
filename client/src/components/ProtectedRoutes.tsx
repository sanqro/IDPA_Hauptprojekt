import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvier";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
