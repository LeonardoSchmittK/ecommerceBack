import { expect, test } from "vitest";
import request from "supertest";
import app from "../index";

test("GET clientes devem ser resgatador com sucesso", async () => {
  const res = await request(app).get("/clientes");
  expect(res.status).toBe(200);
});

test("GET cliente deve ser resgatado por id com sucesso", async () => {
  const id = "17ae4d57-6df6-42b8-abfb-7bac25dceedf";
  const res = await request(app).get("/clientes/" + id);
  expect(res.status).toBe(200);
  expect(res.body).toBeTruthy();
});

test("GET cliente repetido deve ser proibido de criação", async () => {
  const userExample = {
    name: "lero",
    password: "leorxxxzwwtritro",
    email: "testey455rxxwww4244r@gmail.com",
  };

  const res = await request(app).post("/clientes").send(userExample);

  expect(res.status).toBe(400);
});
