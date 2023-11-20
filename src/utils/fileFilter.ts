import { InvalidFileError } from "@/errors/invalid-file-error";
import path from "path";

export const fileFilter = (req: any, file: any, callback: any) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];

  // Verifica a extensão do arquivo
  const extname = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extname)) {
    // Aceita o arquivo
    callback(null, true);
  } else {
    // Rejeita o arquivo (envia um erro)
    callback(new InvalidFileError());
  }
};