import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetStatusUsecase } from '../../usecases/health-check/get-status.usecase';
import { GetStatusResponse } from './dtos/get-status-response.dto';

@ApiTags('Health Check')
@Controller('status')
export class HealthCheckController {
  /* c8 ignore next 1 */
  constructor(private readonly healthCheckUsecase: GetStatusUsecase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status da API',
    type: GetStatusResponse,
  })
  async getStatus(): Promise<GetStatusResponse> {
    return this.healthCheckUsecase.execute();
  }
}
