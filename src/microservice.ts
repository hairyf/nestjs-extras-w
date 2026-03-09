import type { INestApplication } from '@nestjs/common'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { merge } from '@hairy/utils'
import { Transport } from '@nestjs/microservices'
import { context } from './internal'
import { parseWithEnvExpand } from './utils'

export async function withNestjsMicroservice(app: INestApplication, service?: { microservice?: MicroserviceOptions }) {
  if (!service || !service.microservice)
    return

  const options = merge(service.microservice, {
    // @ts-expect-error - Transport is not a valid property of MicroserviceOptions
    transport: Transport[service.microservice.transport] || service.microservice.transport,
    // @ts-expect-error - options is not a valid property of MicroserviceOptions
    options: parseWithEnvExpand(service.microservice.options),
  })

  const microservice = app.connectMicroservice(options)

  context.microservice.instance = microservice
  context.microservice.options = options
  await app.startAllMicroservices()
}
