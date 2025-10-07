import { pool } from "./db.js";

export async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC NOT NULL
    )
  `);
}

export async function createProduct(name: string, price: number) {
  const res = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  return res.rows[0];
}

export async function getProducts() {
  const res = await pool.query("SELECT * FROM products");
  return res.rows;
}

export async function clearProducts() {
  await pool.query("DELETE FROM products");
}
