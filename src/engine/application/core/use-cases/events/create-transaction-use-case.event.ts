import {Inject} from "@nestjs/common";
import type {ITransactionProvider} from "../../provider/transaction-provider.interface";
import {Transaction} from "../../../domain/entity/transaction.entity";

export class CreateTransactionUseCaseEvent {
    constructor(
        @Inject('ITransactionProvider') private readonly transactionProvider: ITransactionProvider,
    ) {}

    execute(transaction: Transaction) {
        console.log('UseCase Event: create transaction called');
        return this.transactionProvider.create(transaction);
    }
}