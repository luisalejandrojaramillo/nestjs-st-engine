import { Inject } from '@nestjs/common';
import type { ITransactionProvider } from '../../provider/transaction-provider.interface';
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";

export class ValidateTransactionUseCaseEvent {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {}

    execute(input: ITransactionEventInput): boolean {
        console.log('UseCase Event: validate transaction called');
        return this.transactionProvider.validate(input.transaction);
    }
}