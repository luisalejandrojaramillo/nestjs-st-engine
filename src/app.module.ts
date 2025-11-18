import { Module } from '@nestjs/common';
import { AppController } from './engine/entry-point/app.controller.js';
import { PricingProvider } from './engine/providers/pricing.provider.js';
import { TransactionProvider } from './engine/providers/transaction.provider';
import { ValidateTransactionUseCaseEvent } from './engine/application/core/use-cases/events/validate-transaction-use-case.event';
import { CreateTransactionUseCaseEvent } from './engine/application/core/use-cases/events/create-transaction-use-case.event';
import { CalculatePricingUseCaseEvent } from './engine/application/core/use-cases/events/calculate-pricing-use-case.event';
import { ConfirmTransactionUseCaseEvent } from './engine/application/core/use-cases/events/confirm-transaction-use-case.event';
import { DoPostProcessUseCaseEvent } from './engine/application/core/use-cases/events/do-post-process-use-case.event';
import { DoTransferUseCase } from './engine/application/core/use-cases/do-transfer.usecase.js';
import { TransferDomainProvider } from './engine/providers/transfer-domain-provider.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DoTransferUseCase,
    // Chain handlers
    ValidateTransactionUseCaseEvent,
    CreateTransactionUseCaseEvent,
    CalculatePricingUseCaseEvent,
    ConfirmTransactionUseCaseEvent,
    DoPostProcessUseCaseEvent,
    // Providers
    TransactionProvider,
    PricingProvider,
    TransferDomainProvider,
  ],
})
export class AppModule {}
