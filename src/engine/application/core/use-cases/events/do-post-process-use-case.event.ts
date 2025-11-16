import {Transaction} from "../../../domain/entity/transaction.entity";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";

export class DoPostProcessUseCaseEvent {

    execute(input: ITransactionEventInput): Transaction {
        console.log('UseCase Event: do post-process called');
        return input.transaction;
    }
}