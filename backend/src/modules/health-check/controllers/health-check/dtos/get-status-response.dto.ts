import { ApiProperty } from '@nestjs/swagger';

export class GetStatusResponse {
  @ApiProperty({ example: 'OK' })
  status: string;
}
