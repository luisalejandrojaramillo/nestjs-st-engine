import {Transaction} from "../../../domain/entity/transaction.entity";

export class DoPostProcessUseCaseEvent {

    execute(transaction: Transaction): Transaction {
        console.log('UseCase Event: do post-process called');
        return transaction;
    }
}