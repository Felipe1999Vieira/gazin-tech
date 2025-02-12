import { Injectable, Logger } from '@nestjs/common';

import { NiveisError } from '../../errors/niveis.error';
import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import {
  FindAllNiveisUseCaseResponseDTO,
  FindAllNiveisUseCaseParamsDTO,
} from './find-all-niveis.usecase.dto';

@Injectable()
export class FindAllNiveisUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisRepository: INiveisRepository) {}

  async execute(
    params: FindAllNiveisUseCaseParamsDTO,
  ): Promise<FindAllNiveisUseCaseResponseDTO | null> {
    try {
      const page = params.page ? params.page : 1;
      const perPage = params.perPage ? params.perPage : 10;

      if (!Number(page) || !Number(perPage)) {
        throw new NiveisError.PaginationInvalid(this.logger);
      }

      const response = await this.niveisRepository.findAllNiveis({
        page: Number(page),
        perPage: Number(perPage),
      });
      if (!response.niveis.length) {
        throw new NiveisError.NotFounNivel(this.logger);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
