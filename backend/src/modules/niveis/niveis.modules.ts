import { Module } from '@nestjs/common';

import { DesenvolvedorRepository } from '../desenvolvedor/repositories/desenvolvedor.repository';
import { IDesenvolvedorRepository } from '../desenvolvedor/repositories/desenvolvedor.repository.interface';
import { NiveisController } from './niveis.controller';
import { NiveisRepository } from './repositories/niveis.repository';
import { INiveisRepository } from './repositories/niveis.repository.interface';
import { CreateNiveisUsecase } from './usecases/create-niveis/create-niveis.usuecase';
import { DeleteNiveisUseCase } from './usecases/delete-niveis/delete-niveis.usuecase';
import { FindAllNiveisUsecase } from './usecases/find-all-niveis/find-all-niveis.usuecase';
import { FindDesenvolvedorByNiveisUsecase } from './usecases/find-desenvolvedores-by-niveis/find-desenvolvedores-by-niveis.usuecase';
import { FindNiveisByIdUsecase } from './usecases/find-niveis-by-id/find-niveis-by-id.usuecase';
import { UpdateNiveisUseCase } from './usecases/update-niveis/update-niveis.usuecase';
import { ConfigModuleFactory } from '@/config/env.config';
import { DatabaseModule } from '@/infra/database/prisma/database.module';

@Module({
  imports: [ConfigModuleFactory.create(), DatabaseModule],
  controllers: [NiveisController],
  providers: [
    { provide: INiveisRepository, useClass: NiveisRepository },
    { provide: IDesenvolvedorRepository, useClass: DesenvolvedorRepository },
    CreateNiveisUsecase,
    FindAllNiveisUsecase,
    FindNiveisByIdUsecase,
    UpdateNiveisUseCase,
    DeleteNiveisUseCase,
    FindDesenvolvedorByNiveisUsecase,
  ],
  exports: [],
})
export class NiveisModule {}
