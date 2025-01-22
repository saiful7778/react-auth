import PasswordField from "@/components/shadcn/PasswordField";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import Spinner from "@/components/Spinner";
import { loginSchema, type LoginSchemaType } from "@/lib/schemas/authSchema";
import errorResponse from "@/utils/errorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: LoginSchemaType) => {
    try {
      setIsLoading(true);

      await handleLogin(e.email, e.password);

      toast.success("login successful");
      form.reset();
      navigate(state?.from?.pathname || "/login");
    } catch (err) {
      const response = errorResponse<LoginSchemaType>(err, (fields) => {
        Object.entries(fields).forEach(([field, messages]) => {
          let fieldName = field as keyof LoginSchemaType;

          // demo to update api response type to local field
          switch (field) {
            case "email":
              fieldName = "email" as keyof LoginSchemaType;
              break;
          }

          form.setError(fieldName, {
            message: messages?.[0],
          });
        });
      });

      if (response) {
        toast.error(response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email address"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-2">
                <FormLabel>Password</FormLabel>
                <Link to="/forget_password" className="text-sm underline">
                  Forget password?
                </Link>
              </div>
              <FormControl>
                <PasswordField
                  placeholder="Password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          aria-disabled={isLoading ? "false" : "true"}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
