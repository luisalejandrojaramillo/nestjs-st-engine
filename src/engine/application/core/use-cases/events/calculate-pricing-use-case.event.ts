import {Inject} from "@nestjs/common";
import type {IPricingProvider} from "../../provider/pricing-provider.interface";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

export class CalculatePricingUseCaseEvent extends AbstractConditionHandler{
    constructor(
        @Inject('IPricingProvider') private readonly pricingProvider: IPricingProvider,
        ) {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        const pricing = this.pricingProvider.calculate(event.transaction);
        console.log('UseCase Event: calculate pricing called {}', pricing.payerCommission);
        event.transaction.addPricing(pricing.payerCommission)
        return super.handle(event);
    }
}