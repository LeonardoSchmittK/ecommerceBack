import fs from "fs/promises";
async function writeJSONFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2); // 2 significa uma formatação mais bonita ao arquivo json
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (error) {
    console.error("Error writing JSON file:", error);
    throw error;
  }
}

export default writeJSONFile;
