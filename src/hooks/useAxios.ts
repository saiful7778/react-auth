import { axiosPrivate, axiosPublic } from "@/lib/config/axios.config";
import { useEffect } from "react";
import useAuth from "./useAuth";
import type { AuthApiResponse } from "@/types";
import { useNavigate } from "react-router";
import { default_auth_redirect } from "@/lib/staticData";

export function useAxiosSecure() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    handleLogout,
    auth,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] =
          `${auth?.token_Type} ${auth?.access_token || accessToken}`;
        return config;
      },
      (err) => {
        Promise.reject(err);
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;

        if (
          err?.response?.status === 401 &&
          !prevRequest?.sent &&
          (auth?.access_token || accessToken)
        ) {
          prevRequest.sent = true;

          try {
            const { data } = await axiosPublic.post<AuthApiResponse>(
              "/api/refresh-token",
              {},
              {
                headers: {
                  Authorization: `${auth?.token_Type} ${auth?.refresh_token || refreshToken}`,
                },
              },
            );

            if (!data?.status) {
              // If refresh fails, log out the user and reject the request
              handleLogout();
              navigate(default_auth_redirect);
              return Promise.reject(
                data?.message || "Session expired. Logging out.",
              );
            }

            // Update tokens and retry the original request
            prevRequest.headers["Authorization"] =
              `${data?.token_type} ${data?.access_token}`;

            setRefreshToken(data?.refresh_token);
            setAccessToken(data?.access_token);

            return axiosPrivate(prevRequest);
          } catch {
            // If the refresh request itself fails, log out the user
            handleLogout();
            navigate(default_auth_redirect);
            return Promise.reject("Session expired. Logging out.");
          }
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [
    accessToken,
    auth,
    refreshToken,
    setRefreshToken,
    setAccessToken,
    handleLogout,
    navigate,
  ]);

  return axiosPrivate;
}
