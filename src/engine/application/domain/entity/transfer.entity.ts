import {Amount} from "../value-objects/amount.vo";
import {Transaction} from "./transaction.entity";

export class Transfer extends Transaction {
    requestAmount: Amount;
    additionalData: Map<string, string>;

    constructor(
        amount: number,
        currency: string,
        description: string,
        country: string,
        additionalData: Map<string, string>,
    ) {
        super(description, country);
        this.requestAmount = new Amount(amount, currency);
        this.additionalData = additionalData;
    }
}