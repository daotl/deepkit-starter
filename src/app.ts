#!/usr/bin/env ts-node-script
import 'module-alias/register'

import { type Command, App, arg, cli, flag } from '@deepkit/app'
import { eventDispatcher } from '@deepkit/event'
import {
  FrameworkModule,
  onServerBootstrap,
  onServerBootstrapDone,
  onServerMainBootstrap,
  onServerMainBootstrapDone,
  onServerMainShutdown,
  onServerShutdown,
  onServerWorkerBootstrap,
  onServerWorkerBootstrapDone,
  onServerWorkerShutdown,
} from '@deepkit/framework'
import { JSONTransport, Logger } from '@deepkit/logger'
import { type Positive } from '@deepkit/type'
import { PrismaClient } from '@prisma/client'

import { AuthModule } from '~/auth'
import { Config } from '~/config'
import HelloController from '~/rest/hello/controller'
import ProtectedController from '~/rest/protected/controller'
import { TrpcModule } from '~/trpc'

interface User {
  username: string
}

class UserManager {
  users: User[] = []

  addUser(user: User): void {
    this.users.push(user)
  }
}

@cli.controller('test', {
  description: 'My super first command',
})
class TestCommand implements Command {
  constructor(
    protected config: Config['hello'],
    protected userManager: UserManager,
    protected prisma: PrismaClient,
    protected logger: Logger,
  ) {}

  async execute(
    @arg title?: string,
    @flag color: boolean = false,
    // FIXME: Validation not working for now:
    // https://deepkit.io/documentation/framework/cli
    @flag year?: number & Positive,
  ): Promise<void> {
    this.userManager.addUser({ username: 'Peter' })

    const users = await this.prisma.user.findMany()
    this.logger.log('Existing users:')
    users.forEach((u) => this.logger.log(u))

    title ??= this.config.title
    title = `Hello, ${title} @${year ?? this.config.year}`
    if (color) {
      const c = this.config.color
      title = `<${c}>${title}</${c}>`
    }
    this.logger.log(title)
  }
}

const prisma = new PrismaClient()

class ServerListener {
  constructor(private logger: Logger) {}

  @eventDispatcher.listen(onServerBootstrap)
  onServerBootstrap(_event: typeof onServerBootstrap.event): void {
    this.logger.log('Application server bootstrap.')
  }

  @eventDispatcher.listen(onServerBootstrapDone)
  onServerBootstrapDone(_event: typeof onServerBootstrapDone.event): void {
    this.logger.log('The application server has started.')
  }

  @eventDispatcher.listen(onServerMainBootstrap)
  async onServerMainBootstrap(
    _event: typeof onServerMainBootstrap.event,
  ): Promise<void> {
    this.logger.log('Main process: Application server bootstrap.')
    await prisma.$connect()
    // await app.get<TrpcController>().init()
  }

  @eventDispatcher.listen(onServerMainBootstrapDone)
  onServerMainBootstrapDone(
    _event: typeof onServerMainBootstrapDone.event,
  ): void {
    this.logger.log('Main process: The application server has started.')
  }

  @eventDispatcher.listen(onServerWorkerBootstrap)
  onServerWorkerBootstrap(_event: typeof onServerWorkerBootstrap.event): void {
    this.logger.log('Worker process: Application server bootstrap.')
  }

  @eventDispatcher.listen(onServerWorkerBootstrapDone)
  onServerWorkerBootstrapDone(
    _event: typeof onServerWorkerBootstrapDone.event,
  ): void {
    this.logger.log('Worker process: The application server has started.')
  }

  @eventDispatcher.listen(onServerShutdown)
  onServerShutdown(_event: typeof onServerShutdown.event): void {
    this.logger.log('Application server shut down.')
  }

  @eventDispatcher.listen(onServerMainShutdown)
  async onServerMainShutdown(
    _event: typeof onServerMainShutdown.event,
  ): Promise<void> {
    this.logger.log('Main process: Application server shut down.')
    await prisma.$disconnect()
  }

  @eventDispatcher.listen(onServerWorkerShutdown)
  onServerWorkerShutdown(_event: typeof onServerWorkerShutdown.event): void {
    this.logger.log('Worker process: Application server shut down.')
  }
}

export const app = new App({
  config: Config,
  imports: [
    new FrameworkModule({
      // debug: true,
      // port: 8080,
      publicDir: 'public',
    }),
    new TrpcModule(),
    new AuthModule(),
  ],
  controllers: [TestCommand, HelloController, ProtectedController],
  middlewares: [],
  listeners: [ServerListener],
  providers: [UserManager, { provide: PrismaClient, useValue: prisma }],
})
  .loadConfigFromEnv({ envFilePath: ['.env.local', '.env'] })
  .setup((module, config: Config) => {
    // Debug
    if (config.debug) {
      module
        .getImportedModuleByClass(FrameworkModule)
        .configure({ debug: true })
    }

    // Logging
    if (config.logFormat.toLowerCase() === 'json') {
      // enable logging JSON messages instead of formatted strings
      module.setupProvider<Logger>().setTransport([new JSONTransport()])
    }

    // Serve static files from `public`
    // registerStaticHttpController(module, {
    //   path: '/',
    //   localPath: 'public',
    //   controllerName: 'StaticController',
    // })
  })

app
  .run()
  // eslint-disable-next-line no-console
  .catch(console.log)
