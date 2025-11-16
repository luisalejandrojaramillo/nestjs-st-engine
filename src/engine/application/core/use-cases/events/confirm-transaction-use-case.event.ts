import {Transaction} from "../../../domain/entity/transaction.entity";

export class ConfirmTransactionUseCaseEvent {

    execute(transaction: Transaction): Transaction {
        console.log('UseCase Event: confirm transaction called');
        return transaction;
    }
}