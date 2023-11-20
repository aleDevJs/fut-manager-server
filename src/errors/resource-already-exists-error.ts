

export class ResourceAlreadyExistsError extends Error {
  constructor(resource: string) {
    super(`${resource} já existe`);
  }
}