import { Injectable } from '@nestjs/common';
import type { ITransferProvider } from '../application/core/provider/transfer-provider.interface.js';
import type { Transfer } from '../application/domain/entity/transfer.entity.js';

@Injectable()
export class TransferProvider implements ITransferProvider {
  create(transfer: Transfer): Transfer {
    console.log('TransferProvider: create', {
      id: transfer.id,
      description: transfer.description,
      amount: transfer.requestAmount, // objeto Amount
    });
    return transfer;
  }
}
