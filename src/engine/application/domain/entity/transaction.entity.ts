import { randomUUID } from 'crypto';

export class Transaction {
    id: string;
    description: string;
    country: string;
    creationDate: Date;
    lastUpdateDate: Date;

    constructor(description: string, country: string) {
        this.id = randomUUID();
        this.description = description;
        this.country = country;
        this.creationDate = new Date();
        this.lastUpdateDate = new Date();
    }
}
