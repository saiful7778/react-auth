import { AxiosError } from "axios";

type ValidationError<T extends object> = {
  [K in keyof T]?: string[];
};

export default function errorResponse<T extends object>(
  err: unknown,
  callbackError?: (validations: ValidationError<T>) => void,
): string | null {
  if (err instanceof AxiosError) {
    if (err.response) {
      const status = err.response.status;
      const data = err.response.data;

      switch (status) {
        case 401:
          return "Unauthorized. Please login again";
        case 422:
          if (callbackError && data?.data) {
            callbackError?.(data.data);
          }
          return null;
        default:
          return data?.message || "Something went wrong";
      }
    } else if (err.request) {
      return "Internet connection error";
    }
  } else if (err instanceof Error) {
    return err.message || "Something went wrong";
  }
  return "Something went wrong";
}
