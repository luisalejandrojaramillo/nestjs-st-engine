import { Injectable } from '@nestjs/common';
import { Transaction } from '../application/domain/entity/transaction.entity';
import type { ITransactionProvider } from '../application/core/provider/transaction-provider.interface';

@Injectable()
export class TransactionProvider implements ITransactionProvider {
    create(transaction: Transaction): Transaction {
        console.log('TransactionProvider: create', {
            id: transaction.id,
            description: transaction.description,
        });
        return transaction;
    }

    validate(transaction: Transaction): boolean {
        console.log('TransactionProvider: validate');
        return transaction.country == 'CO';
    }
}
