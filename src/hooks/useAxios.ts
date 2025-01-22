import { axiosPrivate } from "@/lib/config/axios.config";
import { useEffect } from "react";
import useAuth from "./useAuth";

export function useAxiosSecure() {
  const { accessToken, auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] =
          `${auth?.token_Type} ${auth?.token || accessToken}`;
        return config;
      },
      (err) => {
        Promise.reject(err);
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (err) => {
        return Promise.resolve(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, auth]);

  return axiosPrivate;
}
