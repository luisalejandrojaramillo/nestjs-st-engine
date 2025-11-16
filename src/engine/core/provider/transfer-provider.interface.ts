import type {Transfer} from '../entity/transfer.entity.js';

export interface ITransferProvider {
    create(transfer: Transfer): Transfer;
}
