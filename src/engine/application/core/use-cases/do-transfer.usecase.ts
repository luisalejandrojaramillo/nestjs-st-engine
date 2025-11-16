import { Injectable, Inject } from '@nestjs/common';
import type { ITransferProvider } from '../provider/transfer-provider.interface.js';
import { TransferStarter } from '../../domain/model/starter/transfer-starter.model.js';
import { Transfer } from '../../domain/entity/transfer.entity.js';

@Injectable()
export class DoTransferUseCase {
  constructor(
    @Inject('ITransferProvider') private readonly transferProvider: ITransferProvider,
  ) {}

  execute(starter: TransferStarter): Transfer {
    console.log('UseCase: execute called');

    const transfer = new Transfer(
      starter.amount,
      starter.currency,
      starter.description,
      starter.additionalData
    );

    return this.transferProvider.create(transfer);
  }
}
