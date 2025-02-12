import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DesenvolvedorError } from '../../errors/desenvolvedor.error';
import { IDesenvolvedorRepository } from '../../repositories/desenvolvedor.repository.interface';
import {
  CreateDesenvolvedorUseCaseParamsDTO,
  CreateDesenvolvedorUseCaseResponseDTO,
} from './create-desenvolvedor.usecase.dto';

@Injectable()
export class CreateDesenvolvedorUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
  ) {}

  async execute(
    params: CreateDesenvolvedorUseCaseParamsDTO,
  ): Promise<CreateDesenvolvedorUseCaseResponseDTO | null> {
    try {
      const dataFormated = new Date(params.data_nascimento);

      if (!(dataFormated instanceof Date) || isNaN(dataFormated.getTime())) {
        throw new DesenvolvedorError.DateInvalid(this.logger);
      }

      const response = await this.desenvolvedorRepository.createDesenvolvedor({
        ...params,
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
