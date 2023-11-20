
export class InvalidDateError extends Error {
  constructor(type: 'earlier' | 'later') {

    if (type === 'earlier') {
      super('Data deve ser maior ou igual a data atual');
    }
    else if (type === 'later') {
      super('Data deve ser menor ou igual a data atual');
    }

  }
}