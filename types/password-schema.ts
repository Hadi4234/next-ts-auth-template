import * as z from "zod";
export const passwordSchema = z
  .string()
  .min(8, { message: "Minimum length should be 8" })
  .max(20, { message: "Maximum length should be 20" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Uppercase letter required",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Lowercase letter required",
  })
  .refine((password) => /[0-9]/.test(password), { message: "Number required" })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Special character required",
  });