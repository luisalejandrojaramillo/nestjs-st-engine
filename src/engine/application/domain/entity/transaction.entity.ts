import { randomUUID } from 'crypto';
import { TransactionWorkflowStatus } from '../value-objects/transaction-workflow-status.vo';

export class Transaction {
    private readonly _id: string;
    private readonly _description: string;
    private readonly _country: string;
    private readonly _creationDate: Date;
    private _lastUpdateDate: Date;
    private _commission: number;
    private _workflowStatus: TransactionWorkflowStatus;

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
        this._workflowStatus = TransactionWorkflowStatus.CREATED;
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

    get workflowStatus(): TransactionWorkflowStatus {
        return this._workflowStatus;
    }

    addPricing(commission: number): void {
        if (commission < 0) {
            throw new Error('Commission cannot be negative');
        }
        this._commission = commission;
        this._workflowStatus = TransactionWorkflowStatus.PRICED;
        this.updateLastUpdateDate();
    }

    completeTransaction(): void {
        this._workflowStatus = TransactionWorkflowStatus.COMPLETED;
        this.updateLastUpdateDate();
    }

    rejectTransaction(): void {
        this._workflowStatus = TransactionWorkflowStatus.REJECTED;
        this.updateLastUpdateDate();
    }

    private updateLastUpdateDate(): void {
        this._lastUpdateDate = new Date();
    }
}
