export class Amount {
    private readonly _value: number;
    private readonly _currency: string;

    constructor(value: number, currency: string) {
        if (value <= 0) {
            throw new Error('Amount.value debe ser mayor que 0');
        }
        if (!currency || currency.trim().length !== 3) {
            throw new Error('Amount.currency debe ser un código ISO de 3 letras');
        }
        this._value = value;
        this._currency = currency.toUpperCase();
    }

    get value(): number {
        return this._value;
    }

    get currency(): string {
        return this._currency;
    }

    equals(other: Amount): boolean {
        return this._value === other._value && this._currency === other._currency;
    }
}