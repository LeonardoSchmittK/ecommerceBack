import { expect, test } from "vitest";
import request from "supertest";
import app from "../index";

// OBS: ao rodar estes testes, o arquivo db.json sofrerá mudanças. Portanto, ao rerodar os testes, pressione ctrl-z para retornar
// e obter testes com maior acurácia

// --------------- CLIENTES ---------------

// ESSES TESTES DEVEM PASSAR

test("GET clientes devem ser resgatados com sucesso", async () => {
  const res = await request(app).get("/clientes");
  expect(res.status).toBe(200);
});

test("POST criar um cliente", async () => {
  const userToUpdate = {
    name: "malaquias de sandálias",
    password: "testeNovoUsuario",
    email: "teste@gmailUNICOO.com", // esse email deve ser único
  };
  const res = await request(app).post("/clientes/").send(userToUpdate);

  expect(res.status).toBe(200);
});

test("GET cliente deve ser resgatado por id com sucesso", async () => {
  const id = "12345";
  const res = await request(app).get("/clientes/" + id);
  expect(res.status).toBe(200);
  expect(res.body).toBeTruthy();
});

test("POST cliente com email repetido deve ser proibido de criação", async () => {
  const userExample = {
    name: "lero",
    password: "leorxxxzwwtritro",
    email: "testee@gmail.com", // esse email já existe
  };

  const res = await request(app).post("/clientes").send(userExample);

  expect(res.status).toBe(400);
});

test("DELETE deletar cliente", async () => {
  const idToRemove = "55b8df34-ae1b-4ced-b47f-0af108dadb9b"; // esse id existe
  const res = await request(app).delete(`/clientes/${idToRemove}`);

  expect(res.status).toBe(200);
});

test("PUT atualizar cliente", async () => {
  const userToUpdate = {
    id: "12345", // esse id existe
    password: "12345",
    email: "testee@gmail.com",
    name: "o maior do cristiano mundo messi",
  };
  const res = await request(app).put("/clientes/").send(userToUpdate);

  expect(res.status).toBe(200);
});

// ESSES TESTES DEVEM TESTAR OS ERROS, COMO STATUS 404

test("GET rota clientese não existe, deve retornar 404", async () => {
  const res = await request(app).get("/clientese");
  expect(res.status).toBe(404);
});

test("GET um id que não existe deve retornar um 400", async () => {
  const id = "00000"; // esse id não existe
  const res = await request(app).get("/clientes/" + id);
  expect(res.status).toBe(400);
});

test("PUT um id que não existe deve retornar um status 400", async () => {
  const userToUpdate = {
    id: "12345000000000000000000", // esse id não existe
    password: "12345",
    email: "testee@gmail.com",
    name: "o maior do cristiano mundo messi",
  };
  const res = await request(app).put("/clientes/").send(userToUpdate);

  expect(res.status).toBe(400);
});

test("POST criar um cliente sem email e senha deve retornar um status 400", async () => {
  const userToUpdate = {
    // criar usuario sem email nem senha deve dar erro
    name: "malaquias de sandálias",
  };
  const res = await request(app).post("/clientes/").send(userToUpdate);

  expect(res.status).toBe(400);
});

test("DELETE deletar cliente com id inexistente deve retornar 400", async () => {
  const idToRemove = "00000123"; // esse id NÃO existe
  const res = await request(app).delete(`/clientes/${idToRemove}`);

  expect(res.status).toBe(400);
});

// ------------ PRODUTOS -------------

// ESSES TESTES DEVEM PASSAR

test("GET produtos devem ser resgatados com sucesso", async () => {
  const res = await request(app).get("/produtos");
  expect(res.status).toBe(200);
});

test("GET retornar produto com o id", async () => {
  const id = "738c7e6a-7357-4daf-8c87-ffac18ce2cd4";
  const res = await request(app).get("/produtos/" + id);
  expect(res.status).toBe(200);
  expect(res.body).toBeTruthy();
});

test("DELETE deletar produto com o id", async () => {
  const id = "738c7e6a-7357-4daf-8c87-ffac18ce2cd4";
  const res = await request(app).delete("/produtos/" + id);
  expect(res.status).toBe(200);
});

test("PUT atualizar produto", async () => {
  const userToUpdate = {
    id: "90",
    name: "homem da arana IIII",
  };
  const res = await request(app).put("/produtos/").send(userToUpdate);

  expect(res.status).toBe(200);
});

// ESSES TESTES DEVEM NÃO PASSAR

test("GET endpoint produtoss não existe e deve retornar 404", async () => {
  const res = await request(app).get("/produtoss"); //
  expect(res.status).toBe(404);
});

test("GET id do produto não existe e deve retornar 404", async () => {
  const id = "1234445"; // esse id não existe
  const res = await request(app).get("/produtos/" + id);
  expect(res.status).toBe(404);
});

test("DELETE deletar produto com o id inexistente deve retornar 404", async () => {
  const id = "738c7e6a-7357-4daf-8c87-ffac18ce2cd422222";
  const res = await request(app).delete("/produtos/" + id);
  expect(res.status).toBe(404);
});
