import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EngineModule } from '../application/engine.module';

@Module({
  imports: [EngineModule],
  controllers: [AppController],
})
export class EntryPointModule {}

