import { Module } from '@nestjs/common';
import { AppController } from './engine/entry-point/app.controller.js';
import { DoTransferUseCase } from './engine/application/core/use-cases/do-transfer.usecase.js';
import { TransferProvider } from './engine/providers/transfer.provider.js';
import { PricingProvider } from './engine/providers/pricing.provider.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DoTransferUseCase,
    {
      provide: 'ITransferProvider',
      useClass: TransferProvider,
    },
    {
      provide: 'IPricingProvider',
      useClass: PricingProvider,
    },
  ],
})
export class AppModule {}
