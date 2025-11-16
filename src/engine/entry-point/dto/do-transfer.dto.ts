export class DoTransferDto {
    amount: number;
    currency: string;
    description: string;
    country: string;
    additionalData: Map<string, string>;

    constructor(
        amount: number,
        currency: string,
        description: string,
        country: string,
        additionalData: Map<string, string>
    ) {
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.country = country;
        this.additionalData = additionalData;
    }
}