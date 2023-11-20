

export class InvalidPasswordError extends Error {
  constructor() {
    super(`Senha deve conter pelo menos 6 caracteres`);
  }
}