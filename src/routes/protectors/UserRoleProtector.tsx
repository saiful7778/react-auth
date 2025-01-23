import useAuth from "@/hooks/useAuth";
import { default_auth_redirect } from "@/lib/staticData";
import type { UserRole } from "@/types";
import { Navigate, useLocation } from "react-router";

const UserRoleProtector: React.FC<{
  children: React.ReactNode;
  userRole: UserRole[];
}> = ({ children, userRole }) => {
  const { user, handleLogout } = useAuth();
  const { pathname } = useLocation();

  if (!userRole.includes(user.role!)) {
    handleLogout();
    return (
      <Navigate to={default_auth_redirect} state={{ from: { pathname } }} />
    );
  }

  return children;
};

export default UserRoleProtector;
