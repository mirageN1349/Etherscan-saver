import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from '../entity/Transaction';
import { TransactionsService } from 'src/transactions/transactions.service';
import { ApiService } from './api.service';

@ApiTags('Api')
@Controller('api')
export class ApiController {
  constructor(
    private transactionsService: TransactionsService,
    private apiService: ApiService,
  ) {}

  @ApiResponse({
    description: 'Address with the highest absolute balance change',
    type: '',
    status: 200,
  })
  @Get('numerical-address')
  getNumericalValueAddressByBalance() {
    return this.transactionsService.getNumericalValueAddressByBalance();
  }

  @ApiResponse({
    isArray: true,
    type: Transaction,
    description: 'Transactions by address',
    status: 200,
  })
  @Get('transactions/:address')
  getTransactionsByAddress(@Param('address') address: string) {
    return this.transactionsService.getTransactionsByAddress(address);
  }

  @ApiResponse({
    description: 'Balance by address',
    status: 200,
  })
  @Get('balance/:address')
  getBalanceByAddress(@Param('address') address: string) {
    return this.apiService.balanceByAddress(address);
  }
}
