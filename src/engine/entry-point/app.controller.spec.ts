import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DoTransferUseCase } from '../application/core/use-cases/do-transfer.usecase';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: DoTransferUseCase,
          useValue: { execute: () => 'Transfer completed successfully!' },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Transfer completed successfully!"', () => {
      expect(appController.doTransfer()).toBe('Transfer completed successfully!');
    });
  });
});
