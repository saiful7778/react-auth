import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../useAxios";
import type { ApiResponseType, UserProfileType } from "@/types";

export default function useUserData() {
  const axios = useAxiosSecure();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } =
        await axios.get<ApiResponseType<UserProfileType>>("/api/me");

      if (!data?.status) {
        throw new Error(data?.message);
      }

      return data?.data;
    },
  });
}
