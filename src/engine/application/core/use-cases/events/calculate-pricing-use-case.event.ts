import {Inject} from "@nestjs/common";
import type {IPricingProvider} from "../../provider/pricing-provider.interface";
import {Transaction} from "../../../domain/entity/transaction.entity";

export class CalculatePricingUseCaseEvent {
    constructor(
        @Inject('IPricingProvider') private readonly pricingProvider: IPricingProvider,
        ) {}

    execute(transaction: Transaction): Transaction {
        console.log('UseCase Event: calculate pricing called');
        const pricing = this.pricingProvider.calculate(transaction);
        return transaction;
    }
}