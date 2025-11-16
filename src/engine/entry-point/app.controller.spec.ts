import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { DoTransferUseCase } from '../core/use-cases/do-transfer.usecase.js';

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
