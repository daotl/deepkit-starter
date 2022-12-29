import {
  http,
  HttpRequest,
  HttpResponse,
  JSONResponse,
  Redirect,
} from '@deepkit/http'

import { Config } from '~/config'
import { cookieStr } from '~/http'

import { type Session, SessionCache, sessionIdCookieName } from './session'
import { authGroup, SessionParameterResolver } from './utils'

const signOutUrl = '/'

class SignInStatus {}

@http.controller().resolveParameterByName('session', SessionParameterResolver)
export class AuthController {
  constructor(
    private config: Config['auth'],
    private sessionCache: SessionCache,
  ) {}

  @http.GET('/api/auth/signin').use(authGroup('public'))
  signIn(): SignInStatus {
    const session: Session = { id: this.config.mockUserId }
    this.sessionCache.set(session.id, session)
    return new JSONResponse({ status: 'ok' }).status(200).headers({
      'Set-Cookie': [
        cookieStr('sessionId', 'RANDOM_SESSION_ID'),
        cookieStr('signedIn', 'true', { httpOnly: false }),
      ],
    })
  }

  @http.GET('/api/auth/signout').use(authGroup('protected'))
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  signOut(_req: HttpRequest, resp: HttpResponse, session: Session) {
    this.sessionCache.delete(session.id)
    // Remove session ID cookie
    resp.setHeader(
      'Set-Cookie',
      cookieStr(sessionIdCookieName, session.id, { maxAge: 0 }),
    )
    return Redirect.toUrl(signOutUrl)
  }
}
