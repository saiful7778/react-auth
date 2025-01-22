import PageTitle from "@/components/PageTitle";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/public/Home";
import { createBrowserRouter } from "react-router";
import AuthProtector from "./protectors/AuthProtector";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import PrivateProtector from "./protectors/PrivateProtector";
import UserRoleProtector from "./protectors/UserRoleProtector";
import User from "@/pages/private/User";
import Admin from "@/pages/private/Admin";
import SuperAdmin from "@/pages/private/SuperAdmin";
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: (
          <PageTitle title="Home">
            <Home />
          </PageTitle>
        ),
      },
      {
        path: "/user",
        element: (
          <PrivateProtector>
            <UserRoleProtector userRole={["user", "admin", "superadmin"]}>
              <PageTitle title="User access">
                <User />
              </PageTitle>
            </UserRoleProtector>
          </PrivateProtector>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateProtector>
            <UserRoleProtector userRole={["admin"]}>
              <PageTitle title="Admin access">
                <Admin />
              </PageTitle>
            </UserRoleProtector>
          </PrivateProtector>
        ),
      },
      {
        path: "/superadmin",
        element: (
          <PrivateProtector>
            <UserRoleProtector userRole={["superadmin"]}>
              <PageTitle title="Super Admin access">
                <SuperAdmin />
              </PageTitle>
            </UserRoleProtector>
          </PrivateProtector>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: (
      <AuthProtector>
        <AuthLayout>
          <PageTitle title="Register">
            <Register />
          </PageTitle>
        </AuthLayout>
      </AuthProtector>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProtector>
        <AuthLayout>
          <PageTitle title="Login">
            <Login />
          </PageTitle>
        </AuthLayout>
      </AuthProtector>
    ),
  },
]);
