import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Etherscan } from '../@types/Etherscan';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  balanceByAddress(address: string): Observable<string> {
    return this.httpService
      .get<Etherscan<string>>('/', {
        method: 'GET',
        params: {
          action: 'balance',
          module: 'account',
          address,
        },
      })
      .pipe(map((res) => res.data.result));
  }
}
