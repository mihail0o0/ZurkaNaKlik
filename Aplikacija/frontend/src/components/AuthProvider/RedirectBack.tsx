import { selectAuthToken } from "@/store/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RedirectBack = () => {
  const token = useSelector(selectAuthToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (location.state?.from && location.state?.from.pathname !== "/logout") {
        navigate(location.state.from);
        console.log(location.state?.from.pathname);
        return;
      }
      navigate("/home");
    }
  }, []);

  return <Outlet />;
};

export default RedirectBack;
