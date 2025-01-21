import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext } from "react";

interface AuthContextProps {
  user: Partial<{
    id: number;
    name: string;
    email: string;
    username: string;
    role: "user" | "admin" | "superAdmin";
  }> | null;
  setUser: React.Dispatch<React.SetStateAction<AuthContextProps["user"]>>;
  auth: Partial<{
    token: string;
    token_Type: string;
  }> | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextProps["auth"]>>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    userData: Partial<AuthContextProps["user"]>
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<AuthContextProps["user"]>(
    "user",
    null
  );
  const [auth, setAuth] = useLocalStorage<AuthContextProps["auth"]>(
    "auth",
    null
  );

  const handleLogin = async (email: string, password: string) => {
    setUser({ email });
    setAuth((prev) => ({...prev, token: "561638543161651" }));
  };

  const handleRegister = async (
    userData: Partial<AuthContextProps["user"]>
  ) => {};

  const handleLogout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
