import path from "path";
import databaseJson from "../db.json" assert { type: "json" };
import readJSONFile from "../utils/readJSONFile.js";
import writeJSONFile from "../utils/writeJSONFile.js";
import { v4 } from "uuid";
import bcryptjs from "bcryptjs";
const database = path.resolve("./db.json");

class UserController {
  async helloWorld(req, res) {
    return res
      .status(200)
      .send("Hello, user controller! How is it going right now??");
  }

  async createUser(req, res) {
    try {
      const userToCreate = req.body;

      if (!userToCreate.email || !userToCreate.password || !userToCreate.name) {
        res
          .status(400)
          .send(
            "Não foi possível criar usuário, certifique-se que o usuário tenha um nome, uma senha e um email"
          );

        return;
      }

      const users = databaseJson.users;
      let doesUserAlreadyExist = false;
      users.forEach((user, idArr) => {
        if (user.email === userToCreate.email) {
          doesUserAlreadyExist = true;
        }
      });

      if (doesUserAlreadyExist) {
        return res.status(400).send("Usuário já existe");
      }

      userToCreate.id = v4();
      userToCreate.password = await bcryptjs.hashSync(
        userToCreate.password,
        10
      );
      const data = await readJSONFile(database);
      const filteredUsers = data.users.push(userToCreate);

      await writeJSONFile(database, data);
      res.status(200).json(data.users);
    } catch (e) {
      res.status(500).send("Não foi possível criar usuário, erro no servidor");
    }
  }

  async deleteProductById(req, res) {
    try {
      const _id = req.params.id;
      const data = await readJSONFile(database);

      const filteredUsers = data.users.filter((user) => user.id !== _id);

      if (filteredUsers.length === data.users.length) {
        res.status(400).send(`Não há usuário para remover com o id ${_id}`);
        return;
      }

      data.users = filteredUsers;

      await writeJSONFile(database, data);

      res.status(200).json(data.users);
    } catch (e) {
      res
        .status(500)
        .send(
          "Não foi possível remover usuário... talvez não exista um usuário com o id..."
        );
    }
  }

  async getUsers(req, res) {
    try {
      res.status(200).json(databaseJson.users);
    } catch (e) {
      res
        .status(500)
        .send("Erro ao resgatar usuários, problema no servidor...");
    }
  }

  async getUserById(req, res) {
    try {
      const _id = req.params.id;

      const users = databaseJson.users;
      let userFound = null;

      users.forEach((user, idArr) => {
        if (user.id == _id) {
          userFound = user;
        }
      });

      if (!userFound) {
        return res.status(400).send("O id não se refere a nenhum usuário!");
      }

      res.status(200).json(userFound);
    } catch (e) {
      res
        .status(500)
        .send("Erro ao resgatar usuário por id, problema no servidor...");
    }
  }

  async updateUser(req, res) {
    try {
      const userToUpdate = req.body;
      const _id = userToUpdate.id;

      const data = await readJSONFile(database);
      const superheroes = data.users;
      let idFound = null;

      superheroes.forEach((user, idArr) => {
        if (user.id == _id) {
          idFound = idArr;
          return;
        }
      });

      if (idFound === null) {
        res.status(400).send("O id não corresponde a nenhum usuário!");
        return;
      }
      if (userToUpdate?.name) {
        data.users[idFound].name = userToUpdate.name;
      }
      if (userToUpdate?.password) {
        data.users[idFound].password = userToUpdate.password;
      }
      if (userToUpdate?.email) {
        data.users[idFound].email = userToUpdate.email;
      }

      await writeJSONFile(database, data);

      res.status(200).json(data.users);
    } catch (e) {
      console.log("Não foi possível criar usuário: " + e);
      res.status(500).send("Não foi possível criar usuário... \nERRO:" + e);
    }
  }
}

export default new UserController();
