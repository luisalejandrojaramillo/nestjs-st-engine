import { Transaction } from "../../domain/entity/transaction.entity";

export interface ITransactionProvider {
    validate(transaction: Transaction): boolean;
    create(transaction: Transaction): Transaction;
}
