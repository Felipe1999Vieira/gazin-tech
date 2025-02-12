import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { GetStatusUsecase } from './usecases/health-check/get-status.usecase';

@Module({
  imports: [ConfigModule],
  controllers: [HealthCheckController],
  providers: [GetStatusUsecase],
  exports: [],
})
export class HealthCheckModule {}
