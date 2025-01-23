import { AuthContextProvider } from "./AuthContext";
import { StateContextProvider } from "./StateContext";
import { ThemeContextProvider } from "./ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const ContextProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <StateContextProvider>
            <HelmetProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </HelmetProvider>
          </StateContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
