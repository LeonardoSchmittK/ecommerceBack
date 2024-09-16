import fs from "fs/promises";
import path from "path";
import databaseJson from "../db.json" assert { type: "json" };
import readJSONFile from "../utils/readJSONFile.js";
import writeJSONFile from "../utils/writeJSONFile.js";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

class AuthController {
  async helloWorld(req, res) {
    return res.status(200).send("Hello, world! How is it going right now??");
  }

  async logout(req, res) {
    res.cookie("token", "none", {
      expires: new Date(0),
    });
    res.status(200).send({ message: "o usuario fez logout" });
  }

  async login(req, res) {
    const { email: emailIncoming, password: passwordIncoming } = req.body;
    const users = databaseJson.users;
    const loggedUser = users.find(
      ({ email, password }) =>
        email == emailIncoming && password == passwordIncoming
    );

    if (loggedUser) {
      const id = loggedUser.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 1000,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });

      return res.status(200).json({ auth: true, token: token });
    } else {
      return res.status(500).send("Usuário não encontrado.");
    }
  }
}

export default new AuthController();
