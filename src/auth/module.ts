import { createModule } from '@deepkit/app'

import { Config } from '~/config'

import { AuthController } from './controller'
import { AuthListener } from './listener'
import { SessionCache, sessionCacheFactory } from './session'
import {
  AuthenticatedUserParameterResolver,
  SessionParameterResolver,
} from './utils'

export class AuthModule extends createModule({
  config: Config,
  listeners: [AuthListener],
  controllers: [AuthController],
  providers: [
    { provide: SessionCache, useFactory: sessionCacheFactory },
    { provide: AuthenticatedUserParameterResolver, scope: 'http' },
    { provide: SessionParameterResolver, scope: 'http' },
  ],
  exports: [AuthenticatedUserParameterResolver, SessionParameterResolver],
}) {}
