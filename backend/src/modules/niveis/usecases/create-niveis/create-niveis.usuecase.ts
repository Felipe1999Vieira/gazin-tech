import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { NiveisError } from '../../errors/niveis.error';
import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import {
  CreateNiveisUseCaseParamsDTO,
  CreateNiveisUseCaseResponseDTO,
} from './create-niveis.usecase.dto';

@Injectable()
export class CreateNiveisUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisRepository: INiveisRepository) {}

  async execute(
    params: CreateNiveisUseCaseParamsDTO,
  ): Promise<CreateNiveisUseCaseResponseDTO | null> {
    try {
      const response = await this.niveisRepository.createNiveis(params);
      return {
        nivel: response.nivel,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NiveisError.NivelExist(this.logger);
        }
      }
      throw error;
    }
  }
}
