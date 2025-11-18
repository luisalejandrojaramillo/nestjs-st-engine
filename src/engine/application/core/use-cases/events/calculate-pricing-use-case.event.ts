import {Injectable} from "@nestjs/common";
import { PricingProvider } from "../../../../providers/pricing.provider";
import {ITransactionEventInput} from "../../../domain/model/transaction-event-input.model";
import {AbstractConditionHandler} from "../../handler/abstract-condition-handler";

@Injectable()
export class CalculatePricingUseCaseEvent extends AbstractConditionHandler{
    constructor(private readonly pricingProvider: PricingProvider) {
        super();
    }

    public handle(event: ITransactionEventInput): boolean {
        const pricing = this.pricingProvider.calculate(event.transaction);
        console.log('UseCase Event: calculate pricing called {}', pricing.payerCommission);
        event.transaction.addPricing(pricing.payerCommission);
        return super.handle(event);
    }
}