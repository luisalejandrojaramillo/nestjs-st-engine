import {Transaction} from "../../../domain/entity/transaction.entity";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";

export class ConfirmTransactionUseCaseEvent {

    execute(input: ITransactionEventInput): Transaction {
        console.log('UseCase Event: confirm transaction called');
        return input.transaction;
    }
}