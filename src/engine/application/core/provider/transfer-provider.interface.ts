import type { Transfer } from '../../domain/entity/transfer.entity.js';

export interface ITransferProvider {
  create(transfer: Transfer): Transfer;
}
