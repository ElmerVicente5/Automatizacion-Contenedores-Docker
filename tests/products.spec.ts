import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { pool } from "../src/db.js";
import { createTable, createProduct, getProducts, clearProducts } from "../src/product.js";

beforeAll(async () => {
  await createTable();
});

beforeEach(async () => {
  await clearProducts();
});

afterAll(async () => {
  await pool.end();
});

describe("Pruebas de integración con Postgres", () => {
  it("debería insertar un producto correctamente", async () => {
    const product = await createProduct("coca-cola", 10);
    expect(product.name).toBe("Coca-Cola");
    expect(Number(product.price)).toBe(10);
  });

  it("debería devolver productos desde la base de datos", async () => {
    await createProduct("Pepsi", 8);
    const products = await getProducts();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe("Pepsi");
  });

  it("debería limpiar la tabla antes de cada prueba", async () => {
    const products = await getProducts();
    expect(products.length).toBe(0);
  });
});
