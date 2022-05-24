import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entity/Transaction';
import { NumericalAddressDto } from './dto/numerical-address.dto';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  getNumericalValueAddressByBalance(): Promise<NumericalAddressDto[]> {
    return this.query(
      `with cte1 as (select  "from", sum(value) as summm
       from transactions
       where "blockNumber" in
                          (select "blockNumber"
                          from transactions
                          group by "blockNumber"
                          order by "blockNumber" desc
                          limit 100)
       group by "from"),
       cte2 as (select  "to", sum(value) as summm
       from transactions
       where "blockNumber" in
                          (select "blockNumber"
                          from transactions
                          group by "blockNumber"
                          order by "blockNumber" desc
                          limit 100) 
       group by "to"),
       cte3 as (   select g.address, sum(g.summm) as summm
                  from
                  (select "from" as address, summm from cte1
                  union all
                  select "to" as address, summm from cte2) g
                  group by address
              )
       select address
       from cte3
       where summm = (select max(summm) from cte3)
      `,
    );
  }
}
