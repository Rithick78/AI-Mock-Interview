import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './Backend/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_bj24OHpoLfxW@ep-autumn-term-a19v5cy0-pooler.ap-southeast-1.aws.neon.tech/ai-mock-interview?sslmode=require&channel_binding=require",
  },
});