import {Transaction} from "../../domain/entity/transaction.entity";
import {PricingCalculatedModel} from "../../domain/model/pricing-calculated.model";

export interface IPricingProvider {
    calculate(transaction: Transaction): PricingCalculatedModel;
}