export class TransferStarter {
    constructor(
        public readonly amount: number,
        public readonly currency: string,
        public readonly description: string,
        public readonly country: string,
        public readonly additionalData: Map<string, string>
    ) {}
}