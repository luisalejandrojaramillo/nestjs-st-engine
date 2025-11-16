import { Inject } from '@nestjs/common';
import type { ITransactionProvider } from '../../provider/transaction-provider.interface';
import { TransactionStarter } from '../../../domain/model/starter/transaction-starter.model';
import { Transaction } from '../../../domain/entity/transaction.entity';

export class ValidateTransactionUseCaseEvent {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {}

    execute(starter: TransactionStarter): boolean {
        const transaction = new Transaction(starter.description, starter.country);
        return this.transactionProvider.validate(transaction);
    }
}