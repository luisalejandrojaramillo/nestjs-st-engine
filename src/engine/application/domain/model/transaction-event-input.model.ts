import {Transaction} from "../entity/transaction.entity";

export interface ITransactionEventInput<T extends Transaction = Transaction> {
    transaction: T;
}
