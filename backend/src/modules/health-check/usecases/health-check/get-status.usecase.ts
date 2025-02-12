import { Injectable } from '@nestjs/common';

import { HealthCheckResponse } from './dtos/health-check-response.dto';

@Injectable()
export class GetStatusUsecase {
  async execute(): Promise<HealthCheckResponse> {
    return {
      status: 'OK',
    };
  }
}
