import '@/drizzle-ORM/envConfig';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
  schema: './drizzle-ORM/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});