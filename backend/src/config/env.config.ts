import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, Params as PinoParams } from 'nestjs-pino';
import crypto from 'node:crypto';

export enum AllowedNodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
  SANDBOX = 'sandbox',
}

const DEFAULT_PORT = 3300;
const DEFAULT_API_PREFIX = 'api/v1';
const DEFAULT_NODE_ENV = AllowedNodeEnv.DEVELOPMENT;

export const validationSchema = Joi.object({
  PORT: Joi.number().default(DEFAULT_PORT),
  NODE_ENV: Joi.string()
    .valid(...Object.values(AllowedNodeEnv))
    .default(DEFAULT_NODE_ENV),
  API_PREFIX: Joi.string().default(DEFAULT_API_PREFIX),
  DATABASE_URL: Joi.string().required(),
});

const env = process.env.NODE_ENV || AllowedNodeEnv.DEVELOPMENT;
export class ConfigModuleFactory {
  static create() {
    return ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
      isGlobal: true,
      validationSchema,
    });
  }
}

export class LoggerModuleFactory {
  static create() {
    const config: PinoParams = {
      pinoHttp: {
        redact: {
          paths: ['req.headers.authorization'],
        },
        genReqId: (_req) => {
          return crypto.randomBytes(20).toString('hex');
        },
        autoLogging: {
          ignore: (req) => {
            return req.url.includes('v1/status') && req.log.level === 'info';
          },
        },
      },
    };

    if (env === AllowedNodeEnv.TEST) {
      config.pinoHttp = {
        ...config.pinoHttp,
        autoLogging: false,
      };
    }

    if (env === AllowedNodeEnv.DEVELOPMENT || env === AllowedNodeEnv.TEST) {
      config.pinoHttp = {
        ...config.pinoHttp,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      };
    }

    return LoggerModule.forRoot(config);
  }
}
