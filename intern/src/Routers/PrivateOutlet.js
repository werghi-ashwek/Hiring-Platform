import { Navigate, Outlet } from "react-router-dom";
import { UserProvider } from "../Front/Components/Context/userprovider";

const PrivateOutlet = () => {
  const { auth } = UserProvider();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
