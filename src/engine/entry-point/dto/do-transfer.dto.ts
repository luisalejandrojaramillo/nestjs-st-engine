import {Transfer} from "../../application/domain/entity/transfer.entity";

export class DoTransferDto {
    amount: number;
    currency: string;
    description: string;
    additionalData: Map<string, string>;

    constructor(
        amount: number,
        currency: string,
        description: string,
        additionalData: Map<string, string>
    ) {
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.additionalData = additionalData;
    }
}