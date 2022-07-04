import { eventDispatcher } from '@deepkit/event'
import {
  HttpAction,
  httpWorkflow,
  RouteParameterResolverContext,
} from '@deepkit/http'
import { Logger } from '@deepkit/logger'
import { type User, PrismaClient } from '@prisma/client'

import { type UserCls } from '~/model'

export function authGroup(group: 'public' | 'protected' | 'admin') {
  return (action: HttpAction): void => {
    action.data.set('authGroup', group)
  }
}

export class AutenticatedUserParameterResolver {
  resolve(context: RouteParameterResolverContext): UserCls | Promise<UserCls> {
    if (!context.request.store.user) {
      throw new Error('No user loaded')
    }
    return context.request.store.user as UserCls
  }
}

export class AuthListener {
  constructor(protected logger: Logger, protected prisma: PrismaClient) {}

  @eventDispatcher.listen(httpWorkflow.onAuth)
  async onAuthForApi(event: typeof httpWorkflow.onAuth.event): Promise<void> {
    if (event.route.data.get('authGroup') === 'public') {
      return
    }

    const email = event.request.headers.authorization
    let user: User | null = null
    if (email) {
      user = await this.prisma.user.findUnique({
        where: { email },
      })
    }
    if (!user) {
      return event.accessDenied()
    }

    // success, make sure all routes have the `User` object if they want
    // via MyRouteParameterResolver
    event.request.store.user = user
    this.logger.info('Secure API requested by', user.name)
  }
}
