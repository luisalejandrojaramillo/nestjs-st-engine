import { Injectable, Inject } from '@nestjs/common';
import type { ITransferProvider } from '../provider/transfer-provider.interface.js';
import { TransferStarter } from '../model/starter/transfer-starter.model';
import { Transfer } from '../entity/transfer.entity.js';

@Injectable()
export class DoTransferUseCase {
  constructor(
    @Inject('ITransferProvider') private readonly transferProvider: ITransferProvider,
  ) {}

  execute(starter: TransferStarter): Transfer {
    console.log('UseCase: execute called');

    // Crear la entidad Transfer desde el starter
    const transfer = new Transfer(
      starter.amount,
      starter.currency,
      starter.description,
      starter.additionalData
    );

    // Llamar al provider con la entidad completa del core
    return this.transferProvider.doTransfer(transfer);
  }
}

