import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum Sexo {
  M = 'M',
  F = 'F',
}

export class Desenvolvedor {
  @ApiProperty({
    example: 1,
    description: 'Id do desenvolvedor',
  })
  id: number;

  @ApiProperty({
    example: 2,
    description: 'ID do nível associado ao desenvolvedor',
  })
  @IsNotEmpty({ message: 'O nível é obrigatório.' })
  nivel_id: number;

  @ApiProperty({ example: 'João Silva', description: 'Nome do desenvolvedor' })
  @IsString({ message: 'O campo nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  nome: string;

  @ApiProperty({ example: 'M', description: 'Sexo do desenvolvedor (M ou F)' })
  @IsNotEmpty({ message: 'O campo sexo é obrigatório.' })
  @IsEnum(Sexo, {
    message: `O campo sexo deve conter um dos seguintes valores: ${Object.values(
      Sexo,
    ).join(', ')}`,
  })
  sexo: Sexo;

  @ApiProperty({
    example: '1995-08-15',
    description: 'Data de nascimento do desenvolvedor',
  })
  @IsNotEmpty({ message: 'O campo data de nascimneto é obrigatório.' })
  data_nascimento: string;

  @ApiProperty({
    example: 'Tocar guitarra',
    description: 'Hobby do desenvolvedor',
  })
  @IsString({
    message: 'O campo hobby deve ser uma string.',
  })
  @IsOptional()
  hobby?: string;
}
