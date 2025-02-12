import { Injectable, Logger } from '@nestjs/common';

import { NiveisError } from '../../errors/niveis.error';
import { INiveisRepository } from '../../repositories/niveis.repository.interface';
import { DeleteNiveisUseCaseParamsDTO } from './delete-niveis.usecase.dto';

@Injectable()
export class DeleteNiveisUseCase {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly niveisRepository: INiveisRepository) {}

  async execute(params: DeleteNiveisUseCaseParamsDTO) {
    try {
      const idNivel = Number(params.id);
      if (!idNivel) {
        throw new NiveisError.InvalidIdNivel(this.logger);
      }

      const existDesenvolvedores =
        await this.niveisRepository.findDesenvolvedoresByNiveis({
          idNivel: idNivel,
        });

      if (existDesenvolvedores) {
        throw new NiveisError.NivelExistDesenvolvedor(this.logger);
      }

      const existNivel = await this.niveisRepository.findNiveisById({
        id: idNivel,
      });

      if (!existNivel) {
        throw new NiveisError.NotFounNivelById(this.logger);
      }

      await this.niveisRepository.deleteNiveis({
        id: idNivel,
      });
    } catch (error) {
      throw error;
    }
  }
}
