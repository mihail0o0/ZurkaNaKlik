import { selectAuthToken } from "@/store/auth";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useSelector(selectAuthToken);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
