import CookieCounter from "@/components/CookieCounter";
import LocalStorageCounter from "@/components/LocalStorageCounter";
import { Button } from "@/components/shadcn/ui/button";
import useAuth from "@/hooks/useAuth";
import { default_auth_redirect } from "@/lib/staticData";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Home: React.FC = () => {
  const { isLogged, handleLogout } = useAuth();

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
    <div className="flex h-[calc(100vh-105px)] w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-semibold">
        React Authentication flow <br /> with{" "}
        <span className="text-primary">Laravel backend</span>
      </h1>
      <p>This is simple authentication flow.</p>
      {isLogged ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
      <div className="flex items-center gap-2">
        <CookieCounter />
        <LocalStorageCounter />
      </div>
    </div>
  );
};

export default Home;
