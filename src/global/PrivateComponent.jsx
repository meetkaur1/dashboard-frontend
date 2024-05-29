import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { localstragedata } from "./globalfunction";

const PrivateComponent = () => {
  const naviagte = useNavigate();
  const local_user = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    const { token } = localstragedata();
    if (!token) return naviagte("/");
    if (token && local_user !== "admin") {
      naviagte("/dashboard/all-employees");
    }
  }, []);
  return <Outlet />;
};
export default PrivateComponent;
