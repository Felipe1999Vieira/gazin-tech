import { Injectable, Logger } from '@nestjs/common';

import { DesenvolvedorError } from '../../errors/desenvolvedor.error';
import { IDesenvolvedorRepository } from '../../repositories/desenvolvedor.repository.interface';
import {
  FindAllDesenvolvedoresUseCaseResponseDTO,
  FindAllDesenvolvedoresUseCaseParamasDTO,
} from './find-all-desenvolvedores.usecase.dto';

@Injectable()
export class FindAllDesenvolvedoresUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
  ) {}

  async execute(
    params: FindAllDesenvolvedoresUseCaseParamasDTO,
  ): Promise<FindAllDesenvolvedoresUseCaseResponseDTO | null> {
    const page = params.page ? params.page : 1;
    const perPage = params.perPage ? params.perPage : 10;

    if (!Number(page) || !Number(perPage)) {
      throw new DesenvolvedorError.PaginationInvalid(this.logger);
    }

    const response = await this.desenvolvedorRepository.findAllDesenvolvedores({
      page: Number(page),
      perPage: Number(perPage),
    });

    if (!response) {
      throw new DesenvolvedorError.NotFoundDesenvolvedor(this.logger);
    }

    return {
      desenvolvedores: response.desenvolvedores,
      meta: response.meta,
    };
  }
}
