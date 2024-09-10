"use server"
import { db } from "@/drizzle-ORM/db";
import { users } from "@/drizzle-ORM/schema";
import {  RegisterSchema } from "@/types/register-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/types/Login-schema";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";

const actionClient = createSafeActionClient();

export const userLogin = actionClient
  .schema(LoginSchema)
  .action(async ( { parsedInput: { email, password } } ) => {
  try {
   const hashedPassword = await bcrypt.hash(password, 10)
   const userEmail = await db.query.users.findFirst({
     where: eq(users.email, email), 
   })
    
    if (!userEmail) {
      return { error: "Email not registered" }
    }
    
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
    }) 
     return { success: "User Signed In!" }
  } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" }
          case "AccessDenied":
            return { error: error.message }
          case "OAuthSignInError":
            return { error: error.message }
          default:
            return { error: "Something went wrong" }
        }
      }
      throw error 
  } 
 
})