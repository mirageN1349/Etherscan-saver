import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Transaction } from '../entity/Transaction';
import { map, Observable, catchError, switchMap } from 'rxjs';
import { Connection } from 'typeorm';

import { Etherscan } from 'src/@types/Etherscan';
import { Block } from 'src/entity/Block';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class BlocksService implements OnApplicationBootstrap {
  startBlockNumber: number;
  constructor(
    private httpService: HttpService,
    private transactionsService: TransactionsService,
    private connection: Connection,
  ) {
    this.startBlockNumber = +process.env.START_BLOCK_NUMBER || 9842805; // save transactions starting from this block
  }

  onApplicationBootstrap() {
    this.getBlockById(this.startBlockNumber.toString(16))
      .pipe(map((res) => res.result))
      .subscribe(async (block) => {
        const tx = await this.transactionsService.getTransactionByBlockNumber(
          block?.number,
        );
        if (block && !tx) {
          await this.saveTransactionsFromBlock(block);
          this.startBlockNumber++;
          this.onApplicationBootstrap();
        }
      });
  }

  getBlockById(blockNumber: string): Observable<Etherscan<Block>> {
    return this.httpService
      .get<Etherscan<Block>>('/', {
        method: 'GET',
        params: {
          action: 'eth_getBlockByNumber',
          boolean: true,
          tag: blockNumber,
        },
      })
      .pipe(map((res) => res.data));
  }

  getLastBlock(): Observable<Etherscan<Block>> {
    return this.httpService
      .get<Block>('/', {
        method: 'GET',
        params: {
          action: 'eth_blockNumber',
        },
      })
      .pipe(
        switchMap((res) => {
          const blockNumber = res.data.number;
          return this.getBlockById(blockNumber);
        }),
      );
  }

  async saveTransactionsFromBlock(block: Block): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    const transactionRepository =
      queryRunner.manager.getRepository(Transaction);

    const tsx = block.transactions;

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const [lastTx] = await transactionRepository.find({
        order: { blockNumber: 'DESC' },
        take: 1,
      });

      if (tsx.length && lastTx?.blockNumber === block.number) return;

      tsx.forEach((tx) =>
        transactionRepository.save({
          ...tx,
          value: parseInt(tx.value.toString(), 16),
        }),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return;
  }

  @Interval(3000)
  startTransactionSaver() {
    this.getLastBlock()
      .pipe(map((res) => res.result))
      .pipe(catchError((_, caught) => caught))
      .subscribe(this.saveTransactionsFromBlock.bind(this));
  }
}
