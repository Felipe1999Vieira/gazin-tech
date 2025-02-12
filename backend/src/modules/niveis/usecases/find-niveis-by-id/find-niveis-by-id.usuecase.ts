import { Injectable, Logger } from '@nestjs/common';

import { NiveisError } from '../../errors/niveis.error';
import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import {
  FindNiveisByIdUseCaseResponseDTO,
  FindNiveisByIdUseCaseParamsDTO,
} from './find-niveis-by-id.usecase.dto';

@Injectable()
export class FindNiveisByIdUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisRepository: INiveisRepository) {}

  async execute(
    params: FindNiveisByIdUseCaseParamsDTO,
  ): Promise<FindNiveisByIdUseCaseResponseDTO | null> {
    try {
      if (!Number(params.id)) {
        throw new NiveisError.InvalidIdNivel(this.logger);
      }
      const response = await this.niveisRepository.findNiveisById({
        id: Number(params.id),
      });

      if (!response) {
        throw new NiveisError.NotFounNivelById(this.logger);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
  return;
}
