import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/lib/schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import PasswordField from "@/components/shadcn/PasswordField";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import errorResponse from "@/utils/errorResponse";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import { default_login_redirect } from "@/lib/staticData";

const RegisterForm: React.FC = () => {
  const { handleRegister } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: RegisterSchemaType) => {
    try {
      setIsLoading(true);
      await handleRegister(e);
      toast.success("Registration successful");
      form.reset();
      navigate(default_login_redirect);
    } catch (err) {
      const response = errorResponse<RegisterSchemaType>(err, (fields) => {
        Object.entries(fields).forEach(([field, messages]) => {
          let fieldName = field as keyof RegisterSchemaType;

          // demo to update api response type to local field
          switch (field) {
            case "name":
              fieldName = "name" as keyof RegisterSchemaType;
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full name"
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
                <FormLabel>Password</FormLabel>
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
            {isLoading ? <Spinner /> : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
