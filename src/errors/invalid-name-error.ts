

export class InvalidNameError extends Error {
    constructor(name: string) {
      if (name.length < 3) {
        super(`Nome deve conter pelo menos 3 caracteres`);
        return;
      }

      if (name.length > 50) {
        super(`Nome deve conter no máximo 255 caracteres`);
        return;
      }
    }
}