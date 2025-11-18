import { Injectable } from '@nestjs/common';
import {IPricingProvider} from "../application/core/provider/pricing-provider.interface";
import {Transaction} from "../application/domain/entity/transaction.entity";
import {PricingCalculatedModel} from "../application/domain/model/pricing-calculated.model";

@Injectable()
export class PricingProvider implements IPricingProvider {
    calculate(transaction: Transaction): PricingCalculatedModel {
        console.log("PricingProvider: calculate")
        return new PricingCalculatedModel(0.004);
    }
}