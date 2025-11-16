import {Inject} from "@nestjs/common";
import type {IPricingProvider} from "../../provider/pricing-provider.interface";
import {Transaction} from "../../../domain/entity/transaction.entity";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";

export class CalculatePricingUseCaseEvent {
    constructor(
        @Inject('IPricingProvider') private readonly pricingProvider: IPricingProvider,
        ) {}

    execute(input: ITransactionEventInput): Transaction {
        const pricing = this.pricingProvider.calculate(input.transaction);
        console.log('UseCase Event: calculate pricing called {}', pricing.payerCommission);
        input.transaction.addPricing(pricing.payerCommission)
        return input.transaction;
    }
}