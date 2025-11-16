import {UuidFactory} from "@nestjs/core/inspector/uuid-factory";

export class Transfer {
    id: string;
    amount: number;
    currency: string;
    description: string;
    additionalData: Map<string, string>;
    creationDate: Date;
    lastUpdateDate: Date;

    constructor(
        amount: number,
        currency: string,
        description: string,
        additionalData: Map<string, string>,
    ) {
        this.id = new UuidFactory().toString();
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.additionalData = additionalData;
        this.creationDate = new Date();
        this.lastUpdateDate = new Date();
    }
}