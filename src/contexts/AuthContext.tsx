import { createContext, useState } from "react";

interface AuthContextProps {
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    role: "user" | "admin" | "superAdmin";
  } | null;
  setUser: React.Dispatch<React.SetStateAction<AuthContextProps["user"]>>;
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
  const [user, setUser] = useState<AuthContextProps["user"]>(null);

  const handleLogin = async (email: string, password: string) => {};

  const handleRegister = async (
    userData: Partial<AuthContextProps["user"]>
  ) => {};

  const handleLogout = async () => {};

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
