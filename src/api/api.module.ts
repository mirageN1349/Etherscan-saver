import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from '../transactions/transactions.service';
import { CoreModule } from 'src/core.module';
import { TransactionsRepository } from 'src/transactions/transactions.repository';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([TransactionsRepository])],
  providers: [ApiService, TransactionsService],
  controllers: [ApiController],
})
export class ApiModule {}
