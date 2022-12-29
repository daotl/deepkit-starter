import {
  type HttpRequest,
  HttpAction,
  RouteParameterResolverContext,
} from '@deepkit/http'

import { type User } from '~/models'

import { type Session } from './session'

export function extractSessionFromRequest(
  req: HttpRequest,
): Session | undefined {
  return req.store?.session as Session
}

export function extractUserFromRequest(req: HttpRequest): User | undefined {
  return req.store?.user as User
}

export class SessionParameterResolver {
  resolve(context: RouteParameterResolverContext): Session | Promise<Session> {
    const session = extractSessionFromRequest(context.request)
    if (!session) {
      throw new Error('No session loaded')
    }
    return session
  }
}

export class AutenticatedUserParameterResolver {
  resolve(context: RouteParameterResolverContext): User | Promise<User> {
    const user = extractUserFromRequest(context.request)
    if (!user) {
      throw new Error('No user loaded')
    }
    return user
  }
}

export type AuthGroup = 'public' | 'optional' | 'protected' | 'admin'

export function authGroup(group: AuthGroup) {
  return (action: HttpAction): void => {
    action.data.set('authGroup', group)
  }
}
