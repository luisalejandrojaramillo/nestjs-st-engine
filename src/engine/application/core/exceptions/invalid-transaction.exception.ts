export class InvalidTransactionException extends Error {
  constructor(message: string = 'Invalid transaction') {
    super(message);
    this.name = 'InvalidTransactionException';
  }
}

