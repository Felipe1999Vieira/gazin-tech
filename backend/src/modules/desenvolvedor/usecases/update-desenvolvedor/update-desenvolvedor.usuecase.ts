import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DesenvolvedorError } from '../../errors/desenvolvedor.error';
import { IDesenvolvedorRepository } from '../../repositories/desenvolvedor.repository.interface';
import {
  UpdateDesenvolvedorUseCaseParamsDTO,
  UpdateDesenvolvedorUseCaseResponseDTO,
} from './Update-desenvolvedor.usecase.dto';

@Injectable()
export class UpdateDesenvolvedorUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
  ) {}

  async execute(
    params: UpdateDesenvolvedorUseCaseParamsDTO,
  ): Promise<UpdateDesenvolvedorUseCaseResponseDTO | null> {
    try {
      const idDesenvolvedor = Number(params.id);
      if (!idDesenvolvedor) {
        throw new DesenvolvedorError.InvalidIdDesenvolvedor(this.logger);
      }

      const existDesenvolvedor =
        await this.desenvolvedorRepository.findDesenvolvedorById({
          id: idDesenvolvedor,
        });

      if (!existDesenvolvedor) {
        throw new DesenvolvedorError.NotFoundDesenvolvedorById(this.logger);
      }

      const dataFormated = new Date(params.data_nascimento);

      if (!(dataFormated instanceof Date) || isNaN(dataFormated.getTime())) {
        throw new DesenvolvedorError.DateInvalid(this.logger);
      }

      const response = await this.desenvolvedorRepository.updateDesenvolvedor({
        ...params,
        id: idDesenvolvedor,
        data_nascimento: dataFormated,
      });
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new DesenvolvedorError.NotFoundNivelId(this.logger);
        }
      }
      throw error;
    }
  }
  return;
}
