import { Module } from '@nestjs/common';
import { AppController } from './engine/entry-point/app.controller.js';
import { DoTransferUseCase } from './engine/application/core/use-cases/do-transfer.usecase.js';
import { TransferProvider } from './engine/providers/transfer.provider.js';
import { PricingProvider } from './engine/providers/pricing.provider.js';
import { TransactionProvider } from './engine/providers/transaction.provider';
import { ValidateTransactionUseCaseEvent } from './engine/application/core/use-cases/events/validate-transaction-use-case.event';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DoTransferUseCase,
    ValidateTransactionUseCaseEvent,
    {
      provide: 'ITransferProvider',
      useClass: TransferProvider,
    },
    {
      provide: 'IPricingProvider',
      useClass: PricingProvider,
    },
    {
      provide: 'ITransactionProvider',
      useClass: TransactionProvider,
    }
  ],
})
export class AppModule {}
