import { Module } from '@nestjs/common';

import { ConfigModuleFactory, LoggerModuleFactory } from './config/env.config';
import { DatabaseModule } from './infra/database/prisma/database.module';
import { DesenvolvedorModule } from './modules/desenvolvedor/desenvolvedor.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { NiveisModule } from './modules/niveis/niveis.modules';

@Module({
  imports: [
    ConfigModuleFactory.create(),
    LoggerModuleFactory.create(),
    HealthCheckModule,
    DatabaseModule,
    DesenvolvedorModule,
    NiveisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
