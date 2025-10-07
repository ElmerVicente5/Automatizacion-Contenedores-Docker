import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "testuser",
  password: process.env.PGPASSWORD || "testpass",
  database: process.env.PGDATABASE || "testdb",
});
