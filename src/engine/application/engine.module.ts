import { Module } from '@nestjs/common';
import { ProvidersModule } from '../providers/providers.module';
import { DoTransferUseCase } from './core/use-cases/do-transfer.usecase';
import { ValidateTransactionUseCaseEvent } from './core/use-cases/events/validate-transaction-use-case.event';
import { CreateTransactionUseCaseEvent } from './core/use-cases/events/create-transaction-use-case.event';
import { CalculatePricingUseCaseEvent } from './core/use-cases/events/calculate-pricing-use-case.event';
import { ConfirmTransactionUseCaseEvent } from './core/use-cases/events/confirm-transaction-use-case.event';
import { DoPostProcessUseCaseEvent } from './core/use-cases/events/do-post-process-use-case.event';

@Module({
  imports: [ProvidersModule],
  providers: [
    DoTransferUseCase,
    ValidateTransactionUseCaseEvent,
    CreateTransactionUseCaseEvent,
    CalculatePricingUseCaseEvent,
    ConfirmTransactionUseCaseEvent,
    DoPostProcessUseCaseEvent,
  ],
  exports: [DoTransferUseCase],
})
export class EngineModule {}

