import { Injectable } from "@nestjs/common";
import { TransactionProvider } from "../../../../providers/transaction.provider";
import { ITransactionEventInput } from "../../../domain/model/transaction-event-input.model";
import { AbstractConditionHandler } from "../../handler/abstract-condition-handler";
import { InvalidTransactionException } from "../../exceptions/invalid-transaction.exception";

@Injectable()
export class CreateTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor(private readonly transactionProvider: TransactionProvider) {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: create transaction called');
        try {
            this.transactionProvider.create(event.transaction);
        } catch (e) {
            event.transaction.rejectTransaction();
            throw new InvalidTransactionException();
        }
        return super.handle(event);
    }
}