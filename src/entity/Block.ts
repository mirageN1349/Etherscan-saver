import { Column, OneToMany, Entity } from 'typeorm';
import { AppEntity } from './AppEntity';
import { Transaction } from './Transaction';

@Entity({ name: 'blocks' })
export class Block extends AppEntity {
  @Column()
  number: string;

  @OneToMany(() => Transaction, (tx) => tx.block)
  transactions: Transaction[];
}
