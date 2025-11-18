import { Module } from '@nestjs/common';
import { TransferDomainProvider } from './transfer-domain-provider.service';
import { PricingProvider } from './pricing.provider';
import { TransactionProvider } from './transaction.provider';

@Module({
  providers: [TransactionProvider, PricingProvider, TransferDomainProvider],
  exports: [TransactionProvider, PricingProvider, TransferDomainProvider],
})
export class ProvidersModule {}
