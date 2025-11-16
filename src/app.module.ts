import { Module } from '@nestjs/common';
import { AppController } from './engine/entry-point/app.controller.js';
import { DoTransferUseCase } from './engine/core/use-cases/do-transfer.usecase.js';
import { TransferProvider } from './engine/providers/transfer.provider.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    DoTransferUseCase,
    {
      provide: 'ITransferProvider',
      useClass: TransferProvider,
    },
  ],
})
export class AppModule {}
