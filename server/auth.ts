import { db } from "@/drizzle-ORM/db"
import { LoginSchema } from "@/types/Login-schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { users } from "@/drizzle-ORM/schema"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          }) 
          if (!user || !user.password) return null

         const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
})