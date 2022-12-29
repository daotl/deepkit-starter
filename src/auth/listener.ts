import { eventDispatcher } from '@deepkit/event'
import { httpWorkflow } from '@deepkit/http'
import { Logger } from '@deepkit/logger'
import cookie from 'cookie'

import { Config } from '~/config'
import { e, EdgedbClient } from '~/edgedb'
import { cookieStr } from '~/http'

import { type Session, SessionCache, sessionIdCookieName } from './session'
import { type AuthGroup } from './utils'

export class AuthListener {
  constructor(
    private logger: Logger,
    private config: Config['auth'],
    private edgedb: EdgedbClient,
    private sessionCache: SessionCache,
  ) {}

  @eventDispatcher.listen(httpWorkflow.onAuth)
  async onAuthForApi(event: typeof httpWorkflow.onAuth.event): Promise<void> {
    const authGroup =
      (event.route.data.get('authGroup') as unknown as AuthGroup) ?? 'protected'

    if (
      // Allow access to static files without authentication
      !(event.route.baseUrl + event.route.path).startsWith('/api/') ||
      authGroup === 'public'
    ) {
      return
    }

    const cookies = cookie.parse(event.request.headers.cookie || '')
    let mSession: Session | undefined

    // TODO: Should validate cached sessions' status?
    const sessionIdCookie = cookies[sessionIdCookieName]
    if (sessionIdCookie) {
      mSession = this.sessionCache.get(sessionIdCookie)
      if (mSession) {
        const ttl = 3600_000
        this.sessionCache.set(mSession.id, mSession, ttl)
      }
    }

    // Mock authenticated user for developing
    if (!mSession) {
      mSession = { id: this.config.mockUserId }
    }
    const session: Session = mSession

    const user = await e
      .select(e.User, (_u) => ({
        filter_single: { id: mSession!.id },
        ...e.User['*'],
      }))
      .run(this.edgedb)

    // Not successfully signed-in
    if (!user) {
      // Invalid session, remove it
      this.sessionCache.delete(session.id)

      // Deny if auth is not optional
      if (authGroup !== 'optional') {
        event.accessDenied()
      }
      return
    }

    // Signed-in, make sure all routes have the `User` object if they want
    // via AuthenticatedUserParameterResolver
    this.logger.info('Secure API requested by', user.name)
    event.request.store.session = session
    event.request.store.user = user

    // Set or refresh session ID cookie
    event.response.setHeader(
      'Set-Cookie',
      cookieStr(sessionIdCookieName, session.id),
    )
  }
}
