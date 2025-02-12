import { ApiProperty } from '@nestjs/swagger';

import {
  Meta,
  NiveisDataResponse,
  FindAllNiveisUseCaseParamsDTO,
} from '../usecases/find-all-niveis/find-all-niveis.usecase.dto';

export class FindAllNiveisControllerParamsDTO extends FindAllNiveisUseCaseParamsDTO {}
export class FindAllNiveisControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao buscar niveis',
  })
  message: string;

  @ApiProperty({
    description: 'Dados da resposta',
    type: [NiveisDataResponse],
  })
  data: {
    niveis: NiveisDataResponse[];
  };
  @ApiProperty({
    description: 'Paginação',
    type: Meta,
  })
  meta: Meta;
}
