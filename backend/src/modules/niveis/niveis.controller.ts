import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  CreateNiveisControllerParamsDTO,
  CreateNiveisControllerResponseDTO,
} from './dtos/create-niveis.controller.dto';
import { DeleteNiveisControllerParamsDTO } from './dtos/delete-niveis.controller.dto';
import {
  FindAllNiveisControllerParamsDTO,
  FindAllNiveisControllerResponseDTO,
} from './dtos/find-all-niveis.controller.dto';
import {
  FindNiveisByIdControllerParamsDTO,
  FindNiveisByIdControllerResponseDTO,
} from './dtos/find-niveis-by-id.controller.dto';
import {
  UpdateNiveisControllerBodyDTO,
  UpdateNiveisControllerParamsDTO,
  UpdateNiveisControllerResponseDTO,
} from './dtos/update-niveis.controller.dto';
import { CreateNiveisUsecase } from './usecases/create-niveis/create-niveis.usuecase';
import { DeleteNiveisUseCase } from './usecases/delete-niveis/delete-niveis.usuecase';
import { FindAllNiveisUsecase } from './usecases/find-all-niveis/find-all-niveis.usuecase';
import { FindNiveisByIdUsecase } from './usecases/find-niveis-by-id/find-niveis-by-id.usuecase';
import { UpdateNiveisUseCase } from './usecases/update-niveis/update-niveis.usuecase';
import { ApiResponseInternalServerError } from '@/decorators/api-response-internal-server-error.decorator';
import { ApiResponseValidationError } from '@/decorators/api-response-validation-error.decorator';

@ApiTags('Niveis')
@Controller('niveis')
export class NiveisController {
  constructor(
    private readonly createNiveisUsecase: CreateNiveisUsecase,
    private readonly findAllNiveisUsecase: FindAllNiveisUsecase,
    private readonly findNiveisByIdUsecase: FindNiveisByIdUsecase,
    private readonly updateNiveisUseCase: UpdateNiveisUseCase,
    private readonly deleteNiveisUseCase: DeleteNiveisUseCase,
  ) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'buscar todos os níveis' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'busca de níveis',
    type: FindAllNiveisControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async findAllDesenvolvedores(
    @Query() params: FindAllNiveisControllerParamsDTO,
  ): Promise<FindAllNiveisControllerResponseDTO> {
    const { niveis, meta } = await this.findAllNiveisUsecase.execute(params);
    return {
      message: 'Sucesso ao buscar desenvolvedores',
      data: {
        niveis,
      },
      meta,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'buscar nível por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar nível por ID',
    type: FindNiveisByIdControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async findNivelById(
    @Param() { id }: FindNiveisByIdControllerParamsDTO,
  ): Promise<FindNiveisByIdControllerResponseDTO> {
    const response = await this.findNiveisByIdUsecase.execute({
      id: id,
    });
    return {
      message: 'Sucesso ao buscar nível!',
      data: response,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar niveis' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cadastrar niveis',
    type: CreateNiveisControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async createNiveis(
    @Body() params: CreateNiveisControllerParamsDTO,
  ): Promise<CreateNiveisControllerResponseDTO> {
    const nivel = await this.createNiveisUsecase.execute(params);
    return {
      message: 'Sucesso ao cadastrar nível!',
      data: nivel,
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar nível' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Editar nível',
    type: UpdateNiveisControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async updateNiveis(
    @Param() { id }: UpdateNiveisControllerParamsDTO,
    @Body() params: UpdateNiveisControllerBodyDTO,
  ): Promise<UpdateNiveisControllerResponseDTO> {
    const response = await this.updateNiveisUseCase.execute({
      id: id,
      nivel: params.nivel,
    });
    return {
      message: 'Sucesso ao editar nível!',
      data: response,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover nível' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remover nível',
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async deleteNiveis(@Param() { id }: DeleteNiveisControllerParamsDTO) {
    await this.deleteNiveisUseCase.execute({
      id: id,
    });
  }
}
