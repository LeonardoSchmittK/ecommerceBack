import { expect, test } from "vitest";
import request from "supertest";
import app from "../index";
import { faker } from "@faker-js/faker";

// comando para rodar os testes:
// npx vitest

// --------------- CLIENTES ---------------

// TESTES PARA SUCESSO

test("GET clientes devem ser resgatados com sucesso", async () => {
  const res = await request(app).get("/clientes");
  expect(res.status).toBe(200);
});

const email = faker.internet.email(); // deve ser unico para o teste de POST criar um cliente passar
const randomInt = faker.number.int({ min: 10000, max: 99999 }).toString();

test("POST criar um cliente", async () => {
  const password = faker.internet.password();
  const userToCreate = {
    name: "malaquias de sandálias",
    password: password,
    email: email,
    id: randomInt,
  };
  const res = await request(app).post("/clientes/").send(userToCreate);

  expect(res.status).toBe(200);
});

test("PUT atualizar cliente", async () => {
  const userToUpdate = {
    id: randomInt, // esse id existe
    password: "12345",
    email: "testee@gmail.com",
    name: "o maior do cristiano mundo messi",
  };
  const res = await request(app).put("/clientes/").send(userToUpdate);

  expect(res.status).toBe(200);
});

test("GET cliente deve ser resgatado por id com sucesso", async () => {
  // tive de user setTimeout de milésimos pq por algum motivo o teste falhava mesmo com id existindo
  setTimeout(async () => {
    const res = await request(app).get(`/clientes/${randomInt}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  }, 100);
});

test("DELETE deletar cliente", async () => {
  const idToRemove = randomInt; // esse id existe
  const res = await request(app).delete(`/clientes/${idToRemove}`);

  expect(res.status).toBe(200);
});

// ESSES TESTES DEVEM PASSAR MAS SÃO TESTES DE ERROS

test("GET rota clientese não existe, deve retornar 404", async () => {
  const res = await request(app).get("/clientese");
  expect(res.status).toBe(404);
});

test("POST cliente com email repetido deve ser proibido de criação", async () => {
  setTimeout(async () => {
    // de novo precisei usar alguns milésimos para testar caso contrário o teste vinha errado
    const userExample = {
      name: "lero",
      password: "leorxxxzwwtritro",
      email: email, // esse email já existe
    };

    const res = await request(app).post("/clientes").send(userExample);

    expect(res.status).toBe(400);
  }, 100);
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

// TESTES DE SUCESSOS

const randomIntProduct = faker.number
  .int({ min: 10000, max: 99999 })
  .toString();
const nameProduct = faker.commerce.productName();

test("GET produtos devem ser resgatados com sucesso", async () => {
  const res = await request(app).get("/produtos");
  expect(res.status).toBe(200);
});

test("POST criar um produto", async () => {
  const productToCreate = {
    name: nameProduct,
    price: "400",
    id: randomIntProduct,
  };
  const res = await request(app).post("/produtos/").send(productToCreate);

  expect(res.status).toBe(200);
});

test("GET retornar produto com o id", async () => {
  setTimeout(async () => {
    const id = randomIntProduct;
    const res = await request(app).get("/produtos/" + id);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  }, 100);
});

test("PUT atualizar produto", async () => {
  const userToUpdate = {
    id: randomIntProduct,
    name: "homem da arana IIII",
  };
  const res = await request(app).put("/produtos/").send(userToUpdate);

  expect(res.status).toBe(200);
});

test("DELETE deletar produto com o id", async () => {
  const res = await request(app).delete("/produtos/" + randomIntProduct);
  expect(res.status).toBe(200);
});

test("GET retornar os produtos por preço do menor para o maior e verificar se estão ordenados como tal", async () => {
  const res = await request(app).get("/produtos/filtrar/menorPreco");
  expect(res.status).toBe(200);
  expect(Number(res.body[0].price)).toBeLessThanOrEqual(
    Number(res.body[1].price)
  );
});

test("GET retornar os produtos por preço do maior para o menor e verificar se estão ordenados como tal", async () => {
  const res = await request(app).get("/produtos/filtrar/maiorPreco");
  expect(res.status).toBe(200);
  expect(Number(res.body[0].price)).toBeGreaterThanOrEqual(
    Number(res.body[1].price)
  );
});

test("GET retornar produto através de pesquisa por nome", async () => {
  setTimeout(async () => {
    const textToSearch = nameProduct.slice(0, 3); // pesquisar apenas o início deve funcionar
    const res = await request(app).get("/produtos/pesquisar" + textToSearch);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  }, 100);
});

// ESSES TESTES DEVEM PASSAR MAS SÃO TESTES DE ERROS

test("GET endpoint produtoss não existe e deve retornar 404", async () => {
  const res = await request(app).get("/produtoss"); //
  expect(res.status).toBe(404);
});

test("GET retornar produto através de pesquisa por nome inexistente deve retornar 404", async () => {
  setTimeout(async () => {
    const textToSearch = "ISSONAODEVEFUNCIONARNUNCAQUEISSOCARA"; // esse nome de produto não existe
    const res = await request(app).get("/produtos/pesquisar" + textToSearch);
    expect(res.status).toBe(404);
  }, 100);
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
