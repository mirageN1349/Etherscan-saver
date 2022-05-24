import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entity/Transaction';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionsRepository])],
  providers: [TransactionsService],
  controllers: [],
  exports: [TransactionsService],
})
export class TransactionsModule {}
