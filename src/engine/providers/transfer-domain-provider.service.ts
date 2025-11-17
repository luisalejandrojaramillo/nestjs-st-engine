import { Injectable } from '@nestjs/common';
import type { ITransferDomainProvider } from '../application/core/provider/transfer-provider.interface';
import  { Transfer } from '../application/domain/entity/transfer.entity';

@Injectable()
export class TransferDomainProvider implements ITransferDomainProvider {

  call(transfer: Transfer): boolean {
      console.log("TransferProvider: calling transfer domain")
      return true;
  }
}
