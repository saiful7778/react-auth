import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/ui/avatar";
import { Button } from "./shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/ui/dropdown-menu";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { default_auth_redirect } from "@/lib/staticData";
import useAuth from "@/hooks/useAuth";

const UserDropdown: React.FC = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await toast.promise(
      async () => {
        await handleLogout();
      },
      {
        loading: "Loading...",
        success: "Logged out",
        error: "Error to log out",
      },
    );
    navigate(default_auth_redirect);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.avatar!} alt={user?.name} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/user">
              <span>User Access</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin">
              <span>Admin access</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/superadmin">
              <span>Super Admin access</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
