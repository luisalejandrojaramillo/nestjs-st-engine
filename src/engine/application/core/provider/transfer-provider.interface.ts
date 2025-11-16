import type {Transfer} from '../../domain/entity/transfer.entity';

export interface ITransferProvider {
    create(transfer: Transfer): Transfer;
}
