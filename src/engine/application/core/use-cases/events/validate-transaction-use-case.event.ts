import { Inject } from '@nestjs/common';
import type { ITransactionProvider } from '../../provider/transaction-provider.interface';
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

export class ValidateTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        console.log('UseCase Event: validate transaction called');
        const isValid = this.transactionProvider.validate(event.transaction);
        if (!isValid) {
            console.log('UseCase Event: validation failed, stopping chain');
            return false;
        }
        return super.handle(event);
    }
}