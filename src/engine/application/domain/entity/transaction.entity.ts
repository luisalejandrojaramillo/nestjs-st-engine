import { randomUUID } from 'crypto';

export class Transaction {
    private readonly _id: string;
    private readonly _description: string;
    private readonly _country: string;
    private readonly _creationDate: Date;
    private _lastUpdateDate: Date;
    private _commission: number;

    constructor(description: string, country: string) {
        if (!description || description.trim().length === 0) {
            throw new Error('Description cannot be empty');
        }
        if (!country || country.trim().length === 0) {
            throw new Error('Country cannot be empty');
        }
        this._id = randomUUID();
        this._description = description;
        this._country = country;
        this._creationDate = new Date();
        this._lastUpdateDate = new Date();
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get country(): string {
        return this._country;
    }

    get creationDate(): Date {
        return this._creationDate;
    }

    get lastUpdateDate(): Date {
        return this._lastUpdateDate;
    }

    get commission(): number {
        return this._commission;
    }

    addPricing(commission: number): void {
        if (commission < 0) {
            throw new Error('Commission cannot be negative');
        }
        this._commission = commission;
        this.updateLastUpdateDate();
    }

    private updateLastUpdateDate(): void {
        this._lastUpdateDate = new Date();
    }
}
