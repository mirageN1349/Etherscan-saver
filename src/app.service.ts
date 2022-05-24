import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Etherscan server is up and running 🐈';
  }
}
