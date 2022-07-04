#!/usr/bin/env ts-node-script

import 'reflect-metadata'
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

import { AutenticatedUserParameterResolver, AuthListener } from '~/auth'
import { Config } from '~/config'
import GraphqlController from '~/graphql/controller'
import HelloController from '~/rest/hello/controller'
import ProtectedController from '~/rest/protected/controller'

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

class ServerListener {
  constructor(protected logger: Logger) {}

  @eventDispatcher.listen(onServerBootstrap)
  onServerBootstrap(_event: typeof onServerBootstrap.event): void {
    this.logger.log('Application server bootstrap.')
  }

  @eventDispatcher.listen(onServerBootstrapDone)
  onServerBootstrapDone(_event: typeof onServerBootstrapDone.event): void {
    this.logger.log('The application server has started.')
  }

  @eventDispatcher.listen(onServerMainBootstrap)
  onServerMainBootstrap(_event: typeof onServerMainBootstrap.event): void {
    this.logger.log('Main process: Application server bootstrap.')
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
  onServerMainShutdown(_event: typeof onServerMainShutdown.event): void {
    this.logger.log('Main process: Application server shut down.')
  }

  @eventDispatcher.listen(onServerWorkerShutdown)
  onServerWorkerShutdown(_event: typeof onServerWorkerShutdown.event): void {
    this.logger.log('Worker process: Application server shut down.')
  }
}

const prisma = new PrismaClient()

void new App({
  config: Config,
  controllers: [
    TestCommand,
    HelloController,
    GraphqlController,
    ProtectedController,
  ],
  middlewares: [],
  listeners: [ServerListener, AuthListener],
  providers: [
    UserManager,
    { provide: PrismaClient, useValue: prisma },
    // { provide: PrismaClient, useValue: prisma, scope: 'http' },
    AutenticatedUserParameterResolver,
  ],
  imports: [
    new FrameworkModule({
      // debug: true,
    }),
  ],
})
  .setup(async (module, config: Config) => {
    await prisma.$connect()

    if (config.debug) {
      module
        .getImportedModuleByClass(FrameworkModule)
        .configure({ debug: true })
    }

    if (config.logFormat.toLowerCase() === 'json') {
      // enable logging JSON messages instead of formatted strings
      module.setupProvider<Logger>().setTransport([new JSONTransport()])
    }
  })
  .loadConfigFromEnv({ envFilePath: ['.env.local', '.env'] })
  .run()
  // eslint-disable-next-line no-console
  .catch(console.log)
