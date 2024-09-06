import fs from "fs/promises";
import path from "path";
import databaseJson from "../db.json" assert { type: "json" };
import readJSONFile from "../utils/readJSONFile.js";
import writeJSONFile from "../utils/writeJSONFile.js";
import { v4 } from "uuid";
const database = path.resolve("./db.json");

class ProductsController {
  async helloWorld(req, res) {
    return res.status(200).send("Hello, world! How is it going right now??");
  }

  async getProducts(req, res) {
    try {
      return res.json(databaseJson);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR: ", error });
    }
  }

  async getProductById(req, res) {
    const _id = req.params.id;
    const productFound = databaseJson.superheroes.find(({ id }) => id == _id);

    return productFound
      ? res.status(200).json(productFound)
      : res.status(400).send("Nenhum produto foi encontrado com o id " + _id);
  }

  async getProductsByLowerPrice(req, res) {
    const sortedByLowerPrice = databaseJson.superheroes.sort(
      (a, b) => a.price - b.price
    );

    return sortedByLowerPrice
      ? res.status(200).json(sortedByLowerPrice)
      : res.status(404).send("Não foi possível ordenar por menor preço");
  }

  async getProductsByHigherPrice(req, res) {
    const sortedByHigherPrice = databaseJson.superheroes.sort(
      (a, b) => b.price - a.price
    );

    return sortedByHigherPrice
      ? res.status(200).json(sortedByHigherPrice)
      : res.status(404).send("Não foi possível ordenar por maior preço");
  }

  async getProductsBySearching(req, res) {
    const _searchWritten = req.params.search.split("-").join(" "); // o nome do heroi vem com os espacos em hifen como em "clark-kent"
    const productsFound = databaseJson.superheroes.filter(({ name }) =>
      name.toLowerCase().includes(_searchWritten.toLowerCase())
    );

    return productsFound.length >= 1
      ? res.status(200).json(productsFound)
      : res
          .status(404)
          .send(
            "Nenhum produto foi encontrado com a pesquisa " + _searchWritten
          );
  }

  async deleteProductById(req, res) {
    try {
      const _id = req.params.id;
      const data = await readJSONFile(database);

      const filteredHeroes = data.superheroes.filter((hero) => hero.id !== _id);

      if (filteredHeroes.length === data.superheroes.length) {
        res.status(404).send(`Não há produto para remover com o id ${_id}`);
        return;
      }

      data.superheroes = filteredHeroes;

      await writeJSONFile(database, data);

      res.status(200).json(data.superheroes);
    } catch (e) {
      console.log("Não foi possível remover: " + e);
      res
        .status(500)
        .send(
          "Não foi possível remover... talvez não exista id em um produto..."
        );
    }
  }

  async createProduct(req, res) {
    console.log(req.file);
    try {
      if (req.file) {
        const base64Image = req.file.buffer.toString("base64");
        const productToCreate = req.body;

        if (!productToCreate.name || !productToCreate.price) {
          res
            .status(400)
            .send(
              "Não foi possível criar produto, certifique-se que o produto tenha um nome e um preço"
            );

          return;
        }

        productToCreate.id ? productToCreate.id : v4();
        productToCreate.imageUrl = base64Image;
        productToCreate.imageName = req.file.originalname;
        const data = await readJSONFile(database);
        const filteredHeroes = data.superheroes.push(productToCreate);
        await writeJSONFile(database, data);

        res.status(200).json(data.superheroes);
      } else {
        const productToCreate = req.body;

        productToCreate.id ? productToCreate.id : v4();
        const data = await readJSONFile(database);
        const filteredHeroes = data.superheroes.push(productToCreate);
        await writeJSONFile(database, data);
        res.status(200).json(data.superheroes);
      }
    } catch (e) {
      console.log("Não foi possível criar produto: " + e);
      res.status(500).send("Não foi possível criar produto... \nERRO:" + e);
    }
  }

  async updateProduct(req, res) {
    try {
      const productToUpdate = req.body;
      const _id = productToUpdate.id;

      const data = await readJSONFile(database);
      const superheroes = data.superheroes;
      let idFound = null;

      superheroes.forEach((product, idArr) => {
        if (product.id == _id) {
          idFound = idArr;
          return;
        }
      });

      if (idFound === null) {
        res.status(404).send("O id não corresponde a nenhum produto!");
        return;
      }
      if (productToUpdate?.name) {
        data.superheroes[idFound].name = productToUpdate.name;
      }
      if (productToUpdate?.price) {
        data.superheroes[idFound].price = productToUpdate.price;
      }

      await writeJSONFile(database, data);

      res.status(200).json(data.superheroes);
    } catch (e) {
      console.log("Não foi possível criar produto: " + e);
      res.status(500).send("Não foi possível criar produto... \nERRO:" + e);
    }
  }
}

export default new ProductsController();
