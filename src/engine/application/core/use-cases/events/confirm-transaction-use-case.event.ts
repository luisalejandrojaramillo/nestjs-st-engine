import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

export class ConfirmTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor() {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: confirm transaction called');
        event.transaction.completeTransaction();
        return super.handle(event);
    }
}