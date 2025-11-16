import type {Transfer} from '../../domain/entity/transfer.entity';

export interface ITransferDomainProvider {
    call(transfer: Transfer): boolean;
}
