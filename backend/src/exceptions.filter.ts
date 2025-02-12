/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';

import { CustomValidationError } from './validation.pipe';
import { AllowedNodeEnv } from '@/config/env.config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger(this.constructor.name);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const shouldLogError = [
      AllowedNodeEnv.DEVELOPMENT,
      AllowedNodeEnv.SANDBOX,
      AllowedNodeEnv.PRODUCTION,
    ].includes(process.env.NODE_ENV as AllowedNodeEnv);

    const env = process.env.NODE_ENV as AllowedNodeEnv;

    let status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      if (exception instanceof CustomValidationError) {
        const exceptionResponse: any = exception.getResponse();

        shouldLogError &&
          logger.error({
            msg: exception.message,
            body: request.body,
          });

        return response.status(status).json(exceptionResponse);
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof AxiosError) {
        const axiosError = exception as AxiosError;

        const responseError = axiosError.response?.data ?? 'No response data';
        const operation = `${axiosError.config?.method?.toUpperCase()} ${
          axiosError.config?.baseURL ?? ''
        }${axiosError.config?.url}`;

        shouldLogError &&
          logger.error({
            msg: axiosError.message,
            stack: axiosError.stack,
            body: request.body,
            response: responseError,
            operation,
          });
      } else {
        shouldLogError &&
          logger.error({
            msg: exception.message,
            stack: exception.stack,
            body: request.body,
          });
      }
    }

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      env === AllowedNodeEnv.DEVELOPMENT
    ) {
      return response.status(status).json({
        message: exception.message,
        stack: exception.stack,
      });
    }

    return response.status(status).json({
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Erro interno do servidor'
          : exception.message,
    });
  }
}
