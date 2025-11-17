import {ITransactionEventInput} from "../../domain/model/transaction-event-input.model";

export interface ConditionHandler {
    setNext(handler: ConditionHandler): ConditionHandler;
    handle(event: ITransactionEventInput): boolean;
}

