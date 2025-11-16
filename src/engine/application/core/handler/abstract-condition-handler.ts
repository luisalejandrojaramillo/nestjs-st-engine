import {ConditionHandler} from "./condition-handler.interface";
import {ITransactionEventInput} from "../../domain/model/transaction-event-input.model";

export abstract class AbstractConditionHandler implements ConditionHandler {
    public nextHandler: ConditionHandler | null = null;

    public setNext(handler: ConditionHandler): ConditionHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(event: ITransactionEventInput): boolean {
        if (this.nextHandler) {
            return this.nextHandler.handle(event);
        }
        return true;
    }
}

