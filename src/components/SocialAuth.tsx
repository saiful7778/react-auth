import { Button } from "./shadcn/ui/button";
import { useState } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { GoogleIcon1 } from "@/assets/icons";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { axiosPublic } from "@/lib/config/axios.config";
import useAuth from "@/hooks/useAuth";
import type { AuthApiResponse } from "@/types";
import { useLocation, useNavigate } from "react-router";
import errorResponse from "@/utils/errorResponse";

const SocialAuth: React.FC = () => {
  const { handleUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { access_token } = credentialResponse;

        const { data } = await axiosPublic.post<AuthApiResponse>(
          "/api/social-auth/google",
          {
            token: access_token,
          },
        );
        if (!data?.status) {
          throw new Error(data?.message);
        }
        handleUserAuth(data);
        navigate(state?.from?.pathname || "/login");
      } catch (err) {
        const response = errorResponse(err);
        if (response) {
          toast.error(response);
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err) => {
      toast.error(errorResponse(err));
      setIsLoading(false);
    },
  });

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { credential } = credentialResponse;

        const { data } = await axiosPublic.post<AuthApiResponse>(
          "/api/social-auth/google-one-tap",
          {
            token: credential,
          },
        );
        if (!data?.status) {
          throw new Error(data?.message);
        }
        handleUserAuth(data);
        navigate(state?.from?.pathname || "/login");
      } catch (err) {
        const response = errorResponse(err);
        if (response) {
          toast.error(response);
        }
      }
    },
    onError: () => {
      toast.error("Error on google login");
    },
    disabled: false,
    use_fedcm_for_prompt: true,
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => {
          setIsLoading(true);
          handleGoogleLogin();
        }}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner size={16} />
        ) : (
          <>
            <GoogleIcon1 />
            <span>Login with Google</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialAuth;
