import type { UserRole } from "@/types";

const UserRoleControl: React.FC<{
  children: React.ReactNode;
  userRole: UserRole;
}> = ({ children, userRole }) => {
  return children;
};

export default UserRoleControl;
