import useAuth from "@/hooks/useAuth";
import { default_login_redirect } from "@/lib/staticData";
import { Navigate } from "react-router";

const AuthProtector: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to={default_login_redirect} />;
  }

  return children;
};

export default AuthProtector;
