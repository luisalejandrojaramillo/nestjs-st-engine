import { Inject } from '@nestjs/common';
import type { ITransactionProvider } from '../../provider/transaction-provider.interface';
import { Transaction } from '../../../domain/entity/transaction.entity';

export class ValidateTransactionUseCaseEvent {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {}

    execute(transaction: Transaction): boolean {
        console.log('UseCase Event: validate transaction called');
        return this.transactionProvider.validate(transaction);
    }
}