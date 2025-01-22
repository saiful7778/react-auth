import { AuthContextProvider } from "./AuthContext";
import { StateContextProvider } from "./StateContext";
import { ThemeContextProvider } from "./ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ContextProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <StateContextProvider>
          <HelmetProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </HelmetProvider>
        </StateContextProvider>
      </GoogleOAuthProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
