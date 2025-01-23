export type DispatchAction<T> = T | ((prevState: T) => T);

export type UserRole = "user" | "admin" | "superadmin";

export type Theme = "dark" | "light" | "system";

type SVGProps = React.SVGProps<SVGSVGElement>;

export type ApiResponseType<T> = {
  status: boolean;
  message?: string | undefined;
  error?: string | undefined;
  data?: T | undefined;
  code: number;
};

export type UserType = {
  id: number;
  avatar?: string | undefined | null;
  name: string;
  email: string;
  username: string;
  role: UserRole;
};

export type AuthType = {
  access_token: string;
  refresh_token: string;
  token_Type: string;
};

export interface UserProfileType {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | undefined;
}

export interface AuthApiResponse extends ApiResponseType<UserProfileType> {
  token_type: string;
  access_token: string;
  refresh_token: string;
}
