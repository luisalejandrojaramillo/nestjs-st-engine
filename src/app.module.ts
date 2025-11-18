import { Module } from '@nestjs/common';
import { EntryPointModule } from './engine/entry-point/entry-point.module';

@Module({
  imports: [EntryPointModule],
})
export class AppModule {}
