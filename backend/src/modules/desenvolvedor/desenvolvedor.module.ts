import { Module } from '@nestjs/common';

import { DesenvolvedorController } from './desenvolvedor.controller';
import { DesenvolvedorRepository } from './repositories/desenvolvedor.repository';
import { IDesenvolvedorRepository } from './repositories/desenvolvedor.repository.interface';
import { CreateDesenvolvedorUsecase } from './usecases/create-desenvolvedor/create-desenvolvedor.usuecase';
import { DeleteDesenvolvedorUsecase } from './usecases/delete-desenvolvedor/delete-desenvolvedor.usuecase';
import { FindAllDesenvolvedoresUsecase } from './usecases/find-all-desenvolvedores/find-all-desenvolvedores.usuecase';
import { FindDesenvolvedoresByIdUseCase } from './usecases/find-desenvolvedor-by-id/find-desenvolvedor-by-id.usuecase';
import { UpdateDesenvolvedorUsecase } from './usecases/update-desenvolvedor/update-desenvolvedor.usuecase';
import { ConfigModuleFactory } from '@/config/env.config';
import { DatabaseModule } from '@/infra/database/prisma/database.module';

@Module({
  imports: [ConfigModuleFactory.create(), DatabaseModule],
  controllers: [DesenvolvedorController],
  providers: [
    { provide: IDesenvolvedorRepository, useClass: DesenvolvedorRepository },
    FindAllDesenvolvedoresUsecase,
    CreateDesenvolvedorUsecase,
    UpdateDesenvolvedorUsecase,

    DeleteDesenvolvedorUsecase,
    FindDesenvolvedoresByIdUseCase,
  ],
  exports: [],
})
export class DesenvolvedorModule {}
