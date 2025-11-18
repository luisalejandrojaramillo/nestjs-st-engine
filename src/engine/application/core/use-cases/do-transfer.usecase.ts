import { Injectable, Inject } from '@nestjs/common';
import { TransferStarter } from '../../domain/model/starter/transfer-starter.model';
import { Transfer } from '../../domain/entity/transfer.entity';
import { ValidateTransactionUseCaseEvent } from './events/validate-transaction-use-case.event';
import { CreateTransactionUseCaseEvent } from './events/create-transaction-use-case.event';
import { CalculatePricingUseCaseEvent } from './events/calculate-pricing-use-case.event';
import { ConfirmTransactionUseCaseEvent } from './events/confirm-transaction-use-case.event';
import { DoPostProcessUseCaseEvent } from './events/do-post-process-use-case.event';
import { ITransactionEventInput } from '../../domain/model/transaction-event-input.model';

@Injectable()
export class DoTransferUseCase {
  constructor(
    private readonly validateHandler: ValidateTransactionUseCaseEvent,
    private readonly createHandler: CreateTransactionUseCaseEvent,
    private readonly pricingHandler: CalculatePricingUseCaseEvent,
    private readonly confirmHandler: ConfirmTransactionUseCaseEvent,
    private readonly postProcessHandler: DoPostProcessUseCaseEvent,
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

    this.validateHandler
      .setNext(this.createHandler)
      .setNext(this.pricingHandler)
      .setNext(this.confirmHandler)
      .setNext(this.postProcessHandler);

    const eventInput: ITransactionEventInput<Transfer> = { transaction: transfer };
    const chainResult = this.validateHandler.handle(eventInput);

    if (!chainResult) {
      throw new Error('Transfer chain failed');
    }

    return transfer;
  }
}
