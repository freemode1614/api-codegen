import nodefs from "node:fs/promises";

// Wrtie to file
export async function writeToFile(filePath: string, data: string) {
  try {
    await nodefs.writeFile(filePath, data);
  } catch (error) {
    console.error(error);
  }
}
