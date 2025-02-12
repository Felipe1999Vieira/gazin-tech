import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { NiveisError } from '../../errors/niveis.error';
import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import {
  UpdateNiveisUseCaseParamsDTO,
  UpdateNiveisUseCaseResponseDTO,
} from './update-niveis.usecase.dto';

@Injectable()
export class UpdateNiveisUseCase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisRepository: INiveisRepository) {}

  async execute(
    params: UpdateNiveisUseCaseParamsDTO,
  ): Promise<UpdateNiveisUseCaseResponseDTO> {
    try {
      const idNivel = Number(params.id);
      if (!idNivel) {
        throw new NiveisError.InvalidIdNivel(this.logger);
      }
      const existNivel = await this.niveisRepository.findNiveisById({
        id: idNivel,
      });

      if (!existNivel) {
        throw new NiveisError.NotFounNivelById(this.logger);
      }

      const response = await this.niveisRepository.updateNiveis({
        id: idNivel,
        nivel: params.nivel,
      });

      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NiveisError.NivelExist(this.logger);
        }
      }
      throw error;
    }
  }
  return;
}
