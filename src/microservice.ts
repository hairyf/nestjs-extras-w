import type { INestApplication } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { merge } from '@hairy/utils'
import { Transport } from '@nestjs/microservices'
import { context } from './internal'
import { parseWithEnvExpand } from './utils'

export interface EMicroserviceOptions {
  transport: string
  options: Record<string, string>
}

export async function withNestjsMicroservice(app: INestApplication, microserviceOptions?: EMicroserviceOptions) {
  if (!microserviceOptions)
    return

  const options = merge(microserviceOptions, {
    transport: Transport[microserviceOptions.transport as keyof typeof Transport] || microserviceOptions.transport,
    options: parseWithEnvExpand(microserviceOptions.options),
  })

  const microservice = app.connectMicroservice(options)

  context.microservice.instance = microservice
  context.microservice.options = options as unknown as MicroserviceOptions
  await app.startAllMicroservices()
}
