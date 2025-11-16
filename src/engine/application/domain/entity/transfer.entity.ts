import {Amount} from "../value-objects/amount.vo";
import {Transaction} from "./transaction.entity";

export class Transfer extends Transaction {
    private readonly _requestAmount: Amount;
    private readonly _additionalData: Map<string, string>;

    constructor(
        amount: number,
        currency: string,
        description: string,
        country: string,
        additionalData: Map<string, string>,
    ) {
        super(description, country);
        this._requestAmount = new Amount(amount, currency);
        this._additionalData = additionalData;
    }

    // Getters
    get requestAmount(): Amount {
        return this._requestAmount;
    }

    get additionalData(): Map<string, string> {
        return this._additionalData;
    }
}