import useAuth from "@/hooks/useAuth";
import { default_auth_redirect } from "@/lib/staticData";
import type { UserRole } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserRoleProtector: React.FC<{
  children: React.ReactNode;
  userRole: UserRole[];
}> = ({ children, userRole }) => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole.includes(user.role!)) {
      handleLogout();
      navigate(default_auth_redirect);
    }
  }, [handleLogout, user, userRole, navigate]);

  return children;
};

export default UserRoleProtector;
