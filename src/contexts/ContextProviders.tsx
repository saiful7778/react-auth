import { AuthContextProvider } from "./AuthContext";
import { StateContextProvider } from "./StateContext";
import { ThemeContextProvider } from "./ThemeContext";

const ContextProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StateContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </StateContextProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
