import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteDesenvolvedorUseCaseParamsDTO {
  @ApiProperty({
    example: '1',
    description: 'Id do desenvolvedor',
  })
  @IsNotEmpty({ message: 'O Id do desenvolvedor é obrigatório!' })
  id: number;
}
