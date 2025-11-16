import {Inject} from "@nestjs/common";
import type {ITransactionProvider} from "../../provider/transaction-provider.interface";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

export class CreateTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: create transaction called');
        this.transactionProvider.create(event.transaction);
        return super.handle(event);
    }
}