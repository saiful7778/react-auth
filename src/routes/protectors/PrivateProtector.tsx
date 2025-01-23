import useAuth from "@/hooks/useAuth";
import { default_auth_redirect } from "@/lib/staticData";
import { Navigate, useLocation } from "react-router";

const PrivateProtector: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLogged } = useAuth();
  const { pathname } = useLocation();

  if (!isLogged) {
    return <Navigate to={default_auth_redirect} state={{ from: { pathname } }} />;
  }
  return children;
};

export default PrivateProtector;
