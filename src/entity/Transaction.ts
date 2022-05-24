import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { AppEntity } from './AppEntity';
import { Block } from './Block';

@Entity({ name: 'transactions' })
export class Transaction extends AppEntity {
  @ApiProperty()
  @Column({ type: 'character varying', nullable: false })
  blockNumber: string;

  @ApiProperty()
  @Column({ type: 'character varying' })
  from: string;

  @ApiProperty()
  @Column({ type: 'character varying', nullable: true })
  to: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  value: number;

  @ManyToOne(() => Block, (block) => block.transactions)
  block: Block;
}
