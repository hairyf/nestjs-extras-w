import type { INestApplication, INestMicroservice } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import type { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'
import process from 'node:process'

export const context = {
  swagger: {
    builder: undefined as DocumentBuilder | undefined,
    options: undefined as SwaggerCustomOptions | undefined,
  },
  app: {
    instance: undefined as INestApplication | undefined,
    port: undefined as string | number | undefined,
    get url() {
      return process.env.NODE_ENV === 'production'
        ? `http://[::]:${this.port}`
        : `http://localhost:${this.port}`
    },
  },
  microservice: {
    instance: undefined as INestMicroservice | undefined,
    options: undefined as MicroserviceOptions | undefined,
  },
}
