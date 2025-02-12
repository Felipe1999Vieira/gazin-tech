import { ApiProperty } from '@nestjs/swagger';

import {
  DesenvolvedorWithNivel,
  Meta,
  FindAllDesenvolvedoresUseCaseParamasDTO,
} from '../usecases/find-all-desenvolvedores/find-all-desenvolvedores.usecase.dto';
export class FindAllDesenvolvedoresControllerParamsDTO extends FindAllDesenvolvedoresUseCaseParamasDTO {}
export class FindAllDesenvolvedoresControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao buscar desenvolvedores',
  })
  message: string;

  @ApiProperty({
    description: 'Dados da resposta',
    type: [DesenvolvedorWithNivel],
  })
  data: {
    desenvolvedores: DesenvolvedorWithNivel[];
  };
  @ApiProperty({
    description: 'Paginação',
    type: Meta,
  })
  meta: Meta;
}
