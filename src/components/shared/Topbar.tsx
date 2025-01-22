import useAuth from "@/hooks/useAuth";
import SiteLogo from "../SiteLogo";
import UserDropdown from "../UserDropdown";
import { Button } from "../shadcn/ui/button";
import { Link } from "react-router";

const Topbar: React.FC = () => {
  const { isLogged } = useAuth();
  return (
    <div className="flex items-center justify-between gap-2 border-b py-4">
      <SiteLogo />
      <div className="flex items-center gap-2">
        {isLogged ? (
          <UserDropdown />
        ) : (
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
