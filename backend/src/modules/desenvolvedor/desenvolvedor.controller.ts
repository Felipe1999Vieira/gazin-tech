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
  CreateDesenvolvedorControllerParamsDTO,
  CreateDesenvolvedorControllerResponseDTO,
} from './dtos/create-desenvolvedor.controller.dto';
import { DeleteDesenvolvedorControllerParamsDTO } from './dtos/delete-desenvolvedor.controller.dto';
import {
  FindAllDesenvolvedoresControllerParamsDTO,
  FindAllDesenvolvedoresControllerResponseDTO,
} from './dtos/find-all-desenvolvedores.controller.dto';
import {
  FindDesenvolvedoresByIdControllerParamsDTO,
  FindDesenvolvedoresByIdControllerResponseDTO,
} from './dtos/find-desenvolvedores-by-id.controller.dto';
import {
  UpdateDesenvolvedorControllerBodyDTO,
  UpdateDesenvolvedorControllerParamsDTO,
  UpdateDesenvolvedorControllerResponseDTO,
} from './dtos/update-desenvolvedor.controller.dto';
import { CreateDesenvolvedorUsecase } from './usecases/create-desenvolvedor/create-desenvolvedor.usuecase';
import { DeleteDesenvolvedorUsecase } from './usecases/delete-desenvolvedor/delete-desenvolvedor.usuecase';
import { FindAllDesenvolvedoresUsecase } from './usecases/find-all-desenvolvedores/find-all-desenvolvedores.usuecase';
import { FindDesenvolvedoresByIdUseCase } from './usecases/find-desenvolvedor-by-id/find-desenvolvedor-by-id.usuecase';
import { UpdateDesenvolvedorUsecase } from './usecases/update-desenvolvedor/update-desenvolvedor.usuecase';
import { ApiResponseInternalServerError } from '@/decorators/api-response-internal-server-error.decorator';
import { ApiResponseValidationError } from '@/decorators/api-response-validation-error.decorator';

@ApiTags('Desenvolvedores')
@Controller('desenvolvedores')
export class DesenvolvedorController {
  constructor(
    private readonly findAllDesenvolvedoresUseCase: FindAllDesenvolvedoresUsecase,
    private readonly findDesenvolvedoresByIdUseCase: FindDesenvolvedoresByIdUseCase,
    private readonly createDesenvolvedorUsecase: CreateDesenvolvedorUsecase,
    private readonly updateDesenvolvedorUsecase: UpdateDesenvolvedorUsecase,
    private readonly deleteDesenvolvedorUsecase: DeleteDesenvolvedorUsecase,
  ) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar todos os desenvolvedores com paginação' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Busca de desenvolvedor com paginação',
    type: FindAllDesenvolvedoresControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async findAllDesenvolvedores(
    @Query() params: FindAllDesenvolvedoresControllerParamsDTO,
  ): Promise<FindAllDesenvolvedoresControllerResponseDTO> {
    const { desenvolvedores, meta } =
      await this.findAllDesenvolvedoresUseCase.execute(params);

    return {
      message: 'Sucesso ao buscar desenvolvedores',
      data: {
        desenvolvedores,
      },
      meta,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'buscar todos os desenvolvedores' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'busca de desenvolvedor',
    type: FindDesenvolvedoresByIdControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async findDesenvolvedoresById(
    @Param() { id }: FindDesenvolvedoresByIdControllerParamsDTO,
  ): Promise<FindDesenvolvedoresByIdControllerResponseDTO> {
    const desenvolvedores = await this.findDesenvolvedoresByIdUseCase.execute({
      id: id,
    });
    return {
      message: 'Sucesso ao buscar desenvolvedores',
      data: desenvolvedores,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cadastrar desenvolvedor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cadastrar desenvolvedor',
    type: CreateDesenvolvedorControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async createDesenvolvedor(
    @Body() params: CreateDesenvolvedorControllerParamsDTO,
  ): Promise<CreateDesenvolvedorControllerResponseDTO> {
    const desenvolvedor = await this.createDesenvolvedorUsecase.execute(params);
    return {
      message: 'Sucesso ao cadastrar desenvolvedor',
      data: desenvolvedor,
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar desenvolvedor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Editar desenvolvedor',
    type: UpdateDesenvolvedorControllerResponseDTO,
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async updateDesenvolvedor(
    @Param() { id }: UpdateDesenvolvedorControllerParamsDTO,
    @Body() params: UpdateDesenvolvedorControllerBodyDTO,
  ): Promise<UpdateDesenvolvedorControllerResponseDTO> {
    const desenvolvedor = await this.updateDesenvolvedorUsecase.execute({
      id: id,
      ...params,
    });

    return {
      message: 'Sucesso ao editar desenvolvedor',
      data: desenvolvedor,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover desenvolvedor' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remover desenvolvedor',
  })
  @ApiResponseValidationError()
  @ApiResponseInternalServerError()
  async deleteDesenvolvedor(
    @Param() { id }: DeleteDesenvolvedorControllerParamsDTO,
  ) {
    await this.deleteDesenvolvedorUsecase.execute({
      id: id,
    });
  }
}
