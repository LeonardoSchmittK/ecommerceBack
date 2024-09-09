import fs from "fs/promises";
import path from "path";
import databaseJson from "../db.json" assert { type: "json" };
import readJSONFile from "../utils/readJSONFile.js";
import writeJSONFile from "../utils/writeJSONFile.js";
import { v4 } from "uuid";
const database = path.resolve("./db.json");

class AuthController {
  async helloWorld(req, res) {
    return res.status(200).send("Hello, world! How is it going right now??");
  }
}

export default new AuthController();
