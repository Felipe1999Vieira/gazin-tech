import { Injectable, Logger } from '@nestjs/common';

import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import {
  FindDesenvolvedoresByNiveisUseCaseParamsDTO,
  FindDesenvolvedoresByNiveisUseCaseResponseDTO,
} from './find-desenvolvedores-by-niveis.usecase.dto';
import { NiveisError } from '@/modules/niveis/errors/niveis.error';

@Injectable()
export class FindDesenvolvedorByNiveisUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisdorRepository: INiveisRepository) {}

  async execute(
    params: FindDesenvolvedoresByNiveisUseCaseParamsDTO,
  ): Promise<FindDesenvolvedoresByNiveisUseCaseResponseDTO | null> {
    if (!Number(params.idNivel)) {
      throw new NiveisError.InvalidIdNivel(this.logger);
    }

    const response = await this.niveisdorRepository.findDesenvolvedoresByNiveis(
      {
        idNivel: Number(params.idNivel),
      },
    );

    if (!response) {
      throw new NiveisError.NotFoundDesenvolvedoresByNiveis(this.logger);
    }
    return response;
  }
}
