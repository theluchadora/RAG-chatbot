import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from 'dotenv';

config({path: ".env.local"});
const sql = neon(process.env.NEON_DATABASE_URL!); //exclamation to let typescript know we know what we doing(no type needed)

export const db = drizzle(sql);