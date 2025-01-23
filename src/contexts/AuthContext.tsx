import useCookie from "@/hooks/useCookie";
import useLocalStorage from "@/hooks/useLocalStorage";
import { axiosPublic } from "@/lib/config/axios.config";
import type {
  AuthApiResponse,
  AuthType,
  DispatchAction,
  UserType,
} from "@/types";
import { createContext } from "react";

interface AuthContextProps {
  user: Partial<UserType>;
  setUser: (action: DispatchAction<Partial<UserType>>) => void;
  auth: Partial<AuthType>;
  setAuth: (action: DispatchAction<Partial<AuthType>>) => void;
  accessToken: string | undefined;
  setAccessToken: (action: DispatchAction<string>) => void;
  refreshToken: string | undefined;
  setRefreshToken: (action: DispatchAction<string>) => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    userData: Partial<AuthContextProps["user"]>,
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLogged: boolean;
  handleUserAuth: (inputData: AuthApiResponse) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser, clearUserState] = useLocalStorage<
    AuthContextProps["user"]
  >("user", {});
  const [auth, setAuth, clearAuthState] = useLocalStorage<
    AuthContextProps["auth"]
  >("auth", {});
  const [accessToken, setAccessToken, clearAccessTokenState] = useCookie(
    "access_token",
    "",
  );
  const [refreshToken, setRefreshToken, clearRefreshTokenState] = useCookie(
    "refresh_token",
    "",
  );

  const isLogged =
    !!user &&
    !!user?.email &&
    ((!!auth && !!auth.access_token && !!auth?.refresh_token) || !!accessToken);

  const handleUserAuth = (inputData: AuthApiResponse) => {
    setAccessToken(inputData.access_token);
    setRefreshToken(inputData.refresh_token);
    setAuth((prev) => ({ ...prev, token_Type: inputData?.token_type }));
    setUser((prev) => ({
      ...prev,
      name: inputData?.data?.name,
      email: inputData?.data?.email,
      role: inputData?.data?.role,
      avatar: inputData?.data?.avatar,
    }));
  };

  const handleLogin = async (email: string, password: string) => {
    const { data } = await axiosPublic.post<AuthApiResponse>("/api/login", {
      email,
      password,
    });

    if (!data.status) {
      throw new Error(data?.message);
    }
    handleUserAuth(data);
  };

  const handleRegister = async (
    userData: Partial<AuthContextProps["user"]>,
  ) => {
    const { data } = await axiosPublic.post<AuthApiResponse>(
      "/api/register",
      userData,
    );
    if (!data?.status) {
      throw new Error(data?.message);
    }
    handleUserAuth(data);
  };

  const handleLogout = async () => {
    // axiosPublic.post(
    //   "/api/logout",
    //   {},
    //   {
    //     headers: {
    //       Authorization: `${auth?.token_Type} ${auth?.access_token || accessToken}`,
    //     },
    //   },
    // );
    clearAccessTokenState();
    clearRefreshTokenState();
    clearUserState();
    clearAuthState();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        handleLogin,
        handleRegister,
        handleLogout,
        isLogged,
        handleUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
