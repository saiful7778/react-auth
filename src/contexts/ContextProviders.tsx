import { AuthContextProvider } from "./AuthContext";
import { ThemeContextProvider } from "./ThemeContext";

const ContextProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
