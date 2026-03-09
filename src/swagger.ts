import type { INestApplication } from '@nestjs/common'
import type { SwaggerCustomOptions } from '@nestjs/swagger'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { context } from './internal'

export function withNestjsSwagger(
  app: INestApplication,
  setup?: (config: DocumentBuilder) => DocumentBuilder,
  options?: SwaggerCustomOptions,
) {
  const config = new DocumentBuilder()

  setup?.(config)

  const document = SwaggerModule.createDocument(app, config.build())

  SwaggerModule.setup(
    'swagger/website',
    app,
    document,
    {
      jsonDocumentUrl: 'swagger/json',
      ...options,
    },
  )

  context.swagger.builder = config
  context.swagger.options = options
}
