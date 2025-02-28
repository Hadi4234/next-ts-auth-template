import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  PgArray,
} from "drizzle-orm/pg-core"
import { AdapterAccountType } from "next-auth/adapters"

export const RoleEnum = pgEnum("roles", ["user", "admin"])

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  role: RoleEnum("roles").default("user"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)


export const products = pgTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  price: integer("price"),
  // category: text("category"),
  // rating: integer("rating"),
  // numReviews: integer("numReviews"),
  countInStock: integer("countInStock"),
  // reviews: PgArray(text("reviews")),

})

// export const reviews = pgTable("review", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email"),
//   rating: integer("rating"),
//   comment: text("comment"),
//   productId: text("productId")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
// })
