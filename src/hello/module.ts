import { createModule } from '@deepkit/app'

import { Config } from '~/config'

import { HelloController } from './controller'
import { HelloRouter } from './router'

export class HelloModule extends createModule({
  config: Config,
  controllers: [HelloController],
  providers: [HelloRouter],
  exports: [HelloRouter],
}) {}
