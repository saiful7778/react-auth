import * as z from "zod";

const emailValidation = z
  .string({ required_error: "Email address is required" })
  .email({ message: "Email address is required" })
  .max(80, "Email address is too long");

// const passwordValidation = z
//   .string({ required_error: "Password is required" })
//   .min(8, "Password must be at least 8 characters long")
//   .max(20, "Password must not exceed 20 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//   .regex(/\d/, "Password must contain at least one number");

const passwordValidation = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must not exceed 20 characters");

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .min(1, "Full name is required")
    .max(80, "Full name is too long"),
  email: emailValidation,
  password: passwordValidation,
});

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
