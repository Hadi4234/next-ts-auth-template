import * as z from "zod"
import { passwordSchema } from "./password-schema"

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ['confirmPassword'],
})


export type RegisterFormValues = z.infer<typeof RegisterSchema>
