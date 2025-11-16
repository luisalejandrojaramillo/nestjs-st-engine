import { randomUUID } from 'crypto';

export class Transaction {
    id: string;
    description: string;
    creationDate: Date;
    lastUpdateDate: Date;

    constructor(description: string) {
        this.id = randomUUID();
        this.description = description;
        this.creationDate = new Date();
        this.lastUpdateDate = new Date();
    }
}
