import { Injectable, Logger } from '@nestjs/common';

import { DesenvolvedorError } from '../../errors/desenvolvedor.error';
import { IDesenvolvedorRepository } from '../../repositories/desenvolvedor.repository.interface';
import {
  FindDesenvolvedoresByIdUseCaseParamsDTO,
  FindDesenvolvedoresByIdUseCaseResponseDTO,
} from './find-desenvolvedor-by-id.usecase.dto';

@Injectable()
export class FindDesenvolvedoresByIdUseCase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
  ) {}

  async execute(
    params: FindDesenvolvedoresByIdUseCaseParamsDTO,
  ): Promise<FindDesenvolvedoresByIdUseCaseResponseDTO | null> {
    if (!Number(params.id)) {
      throw new DesenvolvedorError.InvalidIdDesenvolvedor(this.logger);
    }

    const response = await this.desenvolvedorRepository.findDesenvolvedorById({
      id: Number(params.id),
    });

    if (!response) {
      throw new DesenvolvedorError.NotFoundDesenvolvedorById(this.logger);
    }
    return response;
  }
}
