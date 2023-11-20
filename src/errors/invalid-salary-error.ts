
export class InvalidSalaryError extends Error {
  constructor() {
    super('Salário deve ser maior que zero');
  }
}