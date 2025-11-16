import { Injectable } from '@nestjs/common';
import type { ITransferProvider } from '../application/core/provider/transfer-provider.interface';
import  { Transfer } from '../application/domain/entity/transfer.entity';

@Injectable()
export class TransferProvider implements ITransferProvider {
  create(transfer: Transfer): Transfer {
    console.log('TransferProvider: create', {
      id: transfer.id,
      description: transfer.description,
      amount: transfer.requestAmount,
    });
    return transfer;
  }

  validate(transfer: Transfer): boolean {
      console.log("TransferProvider: validate")
      return true;
  }
}
