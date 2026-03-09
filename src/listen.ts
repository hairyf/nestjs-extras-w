import type { INestApplication } from '@nestjs/common'
import process from 'node:process'
import { styleText } from 'node:util'
import { delay, to } from '@hairy/utils'
import { Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { context } from './internal'

const logger = new Logger()

export interface ListenOptions {
  port?: string | number
  trying?: boolean
  onError?: (error: Error) => void
  onListening?: () => void
  onSignal?: () => void
}

export async function startNestjsListen(
  app: INestApplication,
  service: ListenOptions = {},
) {
  const {
    port = process.env.SERVER_PORT || 3000,
    trying = true,
    onError,
    onListening,
    onSignal,
  } = service
  const [error] = await to(app.listen(port))
  if (error) {
    onError?.(error)
    if (trying) {
      logger.error(`Port ${port} is in use, trying ${+port + 1}...`)
      await delay(1000)
      await startNestjsListen(app, { port: +port + 1 })
      return
    }
    else {
      throw error
    }
  }
  context.app.instance = app
  context.app.port = port

  process.on('SIGINT', async () => {
    await app.close()
    onSignal?.()
    logger.log(`${styleText('bold', 'Server:')} ${styleText('gray', 'Closed')}`)
    process.exit(0)
  })

  onListening?.()

  if (context.microservice.options) {
    const { transport } = context.microservice.options as any
    const transportName = Transport[transport] || transport

    logger.log(`${styleText('bold', 'Microservice:')} ${
      transportName
        ? styleText('gray', transportName)
        : styleText('gray', 'Enabled')}`,
    )
  }

  logger.log(`${styleText('bold', 'Listening on:')} ${styleText('gray', context.app.url)}`)
  if (context.swagger.builder) {
    logger.log(`${styleText('bold', 'Swaggier JSON:')} ${styleText('gray', `${context.app.url}/swagger/json`)}`)
    logger.log(`${styleText('bold', 'Swaggier URL:')} ${styleText('gray', `${context.app.url}/swagger/website`)}`)
  }
  if (process.env.NODE_ENV)
    logger.log(`${styleText('bold', 'Environments:')} ${styleText('gray', process.env.NODE_ENV)}`)
}
