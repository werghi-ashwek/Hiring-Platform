
import { Navigate } from "react-router-dom";
import { UserProvider } from "../Front/Components/Context/userprovider";

export default function PrivateRoute({ children }) {
  const auth = UserProvider();

  return auth ? children : <Navigate to="/login" />;
}