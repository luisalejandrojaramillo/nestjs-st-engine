import { Injectable, Inject } from '@nestjs/common';
import type { ITransferDomainProvider } from '../provider/transfer-provider.interface';
import { TransferStarter } from '../../domain/model/starter/transfer-starter.model';
import { Transfer } from '../../domain/entity/transfer.entity';

@Injectable()
export class DoTransferUseCase {
  constructor(
    @Inject('ITransferProvider') private readonly transferProvider: ITransferDomainProvider,
  ) {}

    execute(starter: TransferStarter): Transfer {
        console.log('UseCase: execute called');

        const transfer = new Transfer(
            starter.amount,
            starter.currency,
            starter.description,
            starter.country,
            starter.additionalData
        );

        return transfer;
    }

  execute_v2(starter: TransferStarter): Transfer {
    console.log('UseCase: execute called');

    const transfer = new Transfer(
      starter.amount,
      starter.currency,
      starter.description,
      starter.country,
      starter.additionalData
    );

    const approved = this.transferProvider.call(transfer);
    return transfer;
  }
}
