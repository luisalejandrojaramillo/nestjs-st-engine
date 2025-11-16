import type {Transfer} from '../../domain/entity/transfer.entity';

export interface ITransferProvider {
    validate(transfer: Transfer): boolean;
    create(transfer: Transfer): Transfer;
}
