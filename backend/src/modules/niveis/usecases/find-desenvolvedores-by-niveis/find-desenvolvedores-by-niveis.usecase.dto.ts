import { ApiProperty } from '@nestjs/swagger';

import { Desenvolvedor } from '../../../desenvolvedor/entities/desenvolvedor.entity';

export class FindDesenvolvedoresByNiveisUseCaseParamsDTO {
  @ApiProperty({
    example: 1,
    description: 'Id do nível',
  })
  idNivel: number;
}

export class FindDesenvolvedoresByNiveisUseCaseResponseDTO {
  @ApiProperty({
    type: [Desenvolvedor],
    description: 'Lista de desenvolvedores por niveis',
  })
  desenvolvedores: Desenvolvedor[];
}
