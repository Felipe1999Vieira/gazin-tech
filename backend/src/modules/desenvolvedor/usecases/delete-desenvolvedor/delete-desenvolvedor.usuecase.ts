import { Injectable, Logger } from '@nestjs/common';

import { DesenvolvedorError } from '../../errors/desenvolvedor.error';
import { IDesenvolvedorRepository } from '../../repositories/desenvolvedor.repository.interface';
import { DeleteDesenvolvedorUseCaseParamsDTO } from './Delete-desenvolvedor.usecase.dto';

@Injectable()
export class DeleteDesenvolvedorUsecase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly desenvolvedorRepository: IDesenvolvedorRepository,
  ) {}

  async execute(params: DeleteDesenvolvedorUseCaseParamsDTO) {
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

      await this.desenvolvedorRepository.deleteDesenvolvedor({
        ...params,
        id: idDesenvolvedor,
      });
    } catch (error) {
      throw error;
    }
  }
}
