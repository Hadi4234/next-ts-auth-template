"use server"
import { db } from "@/drizzle-ORM/db";
import { users } from "@/drizzle-ORM/schema";
import {  RegisterSchema } from "@/types/register-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action"
import bcrypt from "bcryptjs"
import { error } from "console";

const actionClient = createSafeActionClient();

export const userRegister = actionClient
  .schema(RegisterSchema)
  .action(async ( { parsedInput: { email, name, password } } ) => {
    // check if user exists
    const userExits = await db.query.users.findFirst({
      where:eq(users.email, email)
    })

    if (userExits) return { error: "User already exists" }

    // create user
    if (!userExits) { 
      const user = await db
        .insert(users)
        .values({ email, name, password: await bcrypt.hash(password, 10) })
        .returning()
      return user
    }
})
