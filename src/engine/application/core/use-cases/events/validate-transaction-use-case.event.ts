import { Injectable } from '@nestjs/common';
import { TransactionProvider } from '../../../../providers/transaction.provider';
import { ITransactionEventInput } from '../../../domain/model/transaction-event-input.model';
import { AbstractConditionHandler } from '../../handler/abstract-condition-handler';

@Injectable()
export class ValidateTransactionUseCaseEvent extends AbstractConditionHandler {
    constructor(private readonly transactionProvider: TransactionProvider) {
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