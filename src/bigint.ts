/* eslint-disable no-extend-native */
import type { INestApplication } from '@nestjs/common'
import { bignumber } from '@hairy/utils'

export function withDecimalRepair(_: INestApplication, Decimal?: any) {
  if (!Decimal)
    return
  Object.defineProperty(Decimal.prototype, 'toString', {
    get() { return () => bignumber(this.toHex()).toFixed() },
  })
  Object.defineProperty(Decimal.prototype, 'toJSON', {
    get() { return () => bignumber(this.toHex()).toFixed() },
  })
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    get() { return () => String(this) },
  })
}
