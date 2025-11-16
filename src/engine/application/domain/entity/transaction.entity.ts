import {UuidFactory} from "@nestjs/core/inspector/uuid-factory";

export class Transaction {
    id: string;
    description: string;
    creationDate: Date;
    lastUpdateDate: Date;

    constructor(description: string) {
        this.id = new UuidFactory().toString();
        this.description = description;
        this.creationDate = new Date();
        this.lastUpdateDate = new Date();
    }
}

