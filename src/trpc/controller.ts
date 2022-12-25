import util from 'node:util'

import { http, HttpRequest, HttpResponse } from '@deepkit/http'
import { Logger } from '@deepkit/logger'
import { type User, PrismaClient } from '@prisma/client'
import { AnyRouter } from '@trpc/server'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'

import { TrpcConfig } from './config'
import { genCreateContext } from './context'
import { createRouter } from './router'

const noop = (): Promise<void> => Promise.resolve()

@http
  .controller('/api')
  .resolveParameterByName('user', AutenticatedUserParameterResolver)
export class TrpcController {
  private router: AnyRouter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handler: (req: any, res: any) => Promise<void> = noop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private playgroundHandler: (req: any, res: any) => Promise<void> = noop

  constructor(private logger: Logger, private prisma: PrismaClient) {
    this.router = createRouter()
  }

  @http.ANY('/trpc/:path').use(authGroup('optional'))
  async placeholder(
    req: HttpRequest,
    res: HttpResponse,
    // path: string,
    user?: User | undefined,
  ): Promise<void> {
    this.logger.log(
      `${req.getRemoteAddress()} - "${req.getMethod()} ${req.getUrl()}" XXX "${
        req.headers.referer ?? ''
      }"`,
    )
    return this.handleRequest(req, res, user)
  }

  @http.ANY('/trpc-playground').use(authGroup('public'))
  async playgroundPlaceholder(
    req: HttpRequest,
    res: HttpResponse,
  ): Promise<void> {
    return this.handleRequest(req, res)
  }

  async handleRequest(
    req: HttpRequest,
    res: HttpResponse,
    _user?: User,
  ): Promise<void> {
    // Build handlers
    if (this.handler === noop || this.playgroundHandler === noop) {
      this.handler = util.promisify(
        createExpressMiddleware({
          router: this.router,
          createContext: genCreateContext(this.prisma),
        }),
      )

      this.playgroundHandler = util.promisify(
        await expressHandler({
          trpcApiEndpoint: TrpcConfig.apiEndpoint,
          playgroundEndpoint: TrpcConfig.playgroundEndpoint,
          router: this.router,
          // uncomment this if you're using superjson
          request: {
            superjson: true,
          },
        }),
      )
    }

    if (req.url === TrpcConfig.playgroundEndpoint) {
      await this.playgroundHandler(req, res)
      return
    }

    // @ts-expect-error ignore
    req.path = req.url?.replace(TrpcConfig.apiEndpoint, '').replace(/\?.*$/, '')
    await this.handler(req, res)
  }
}
