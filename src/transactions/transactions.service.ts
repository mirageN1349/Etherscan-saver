import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entity/Transaction';
import { NumericalAddressDto } from './dto/numerical-address.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionRepository: TransactionsRepository,
  ) {}

  getTransactionsByAddress(address: string) {
    return this.transactionRepository.find({
      where: [{ from: address }, { to: address }],
    });
  }

  getTransactionByBlockNumber(blockNumber: string) {
    return this.transactionRepository.findOne({
      where: { blockNumber },
    });
  }

  save(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  getLast(): Promise<Transaction> {
    return this.transactionRepository.findOne();
  }

  getNumericalValueAddressByBalance(): Promise<NumericalAddressDto[]> {
    return this.transactionRepository.getNumericalValueAddressByBalance();
  }
}
