import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Niveis {
  @ApiProperty({ example: 1, description: 'Id do nível' })
  @IsNotEmpty({ message: 'O campo id é obrigatório!' })
  id: number;

  @ApiProperty({ example: 'Junior', description: 'Nome do nível' })
  @IsString()
  @IsNotEmpty({ message: 'O campo nivel é obrigatório!' })
  nivel: string;
}
