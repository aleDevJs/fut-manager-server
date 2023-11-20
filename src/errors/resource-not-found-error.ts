
export class ResourceNotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} não encontrado`);
  }
}