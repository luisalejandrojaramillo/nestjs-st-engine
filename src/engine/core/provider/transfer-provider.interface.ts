import type { Transfer } from '../entity/transfer.entity.js';

export interface ITransferProvider {
  doTransfer(transfer: Transfer): Transfer;
}
