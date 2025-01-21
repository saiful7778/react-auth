import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/styles.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";
import ContextProviders from "@/contexts/ContextProviders.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProviders>
      <RouterProvider router={router} />
    </ContextProviders>
  </StrictMode>
);
