import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    HttpModule.register({
      baseURL: process.env.ETHERSCAN_API_URL,
      params: { apikey: process.env.ETHERSCAN_API_KEY, module: 'proxy' },
    }),
  ],
  exports: [HttpModule],
})
export class CoreModule {}
