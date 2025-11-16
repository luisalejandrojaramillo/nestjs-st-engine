import { TransactionProvider } from './transaction.provider';
import { Transaction } from '../application/domain/entity/transaction.entity';

describe('TransactionProvider', () => {
  let provider: TransactionProvider;

  beforeEach(() => {
    provider = new TransactionProvider();
  });

  it('debe crear una transacción', () => {
    const tx = new Transaction('desc', 'CO');
    const result = provider.create(tx);
    expect(result).toBe(tx);
  });

  it('debe validar transacción con descripción válida', () => {
    const tx = new Transaction('descripcion valida', 'CO');
    expect(provider.validate(tx)).toBe(true);
  });

  it('debe rechazar transacción con descripción vacía', () => {
    const tx = new Transaction('   ', 'CO');
    expect(provider.validate(tx)).toBe(false);
  });
});
