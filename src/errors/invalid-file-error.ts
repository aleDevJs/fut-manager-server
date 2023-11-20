
export class InvalidFileError extends Error {
  constructor() {
    super("Apenas arquivos PNG e JPG são permitidos!")
  }
}