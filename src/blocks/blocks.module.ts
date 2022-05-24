import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { TransactionsService } from '../transactions/transactions.service';
import { CoreModule } from 'src/core.module';
import { TransactionsRepository } from 'src/transactions/transactions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entity/Transaction';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([Transaction, TransactionsRepository]),
  ],
  providers: [BlocksService, TransactionsService],
  controllers: [],
})
export class BlocksModule {}
