#!/usr/bin/env ts-node-script

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
import { Logger } from '@deepkit/logger'
import { type Positive } from '@deepkit/type'

export interface User {
  username: string
}

export class UserManager {
  users: User[] = []

  addUser(user: User): void {
    this.users.push(user)
  }
}

@cli.controller('test', {
  description: 'My super first command',
})
export class TestCommand implements Command {
  constructor(protected userManager: UserManager, protected logger: Logger) {}

  execute(
    @arg title: string,
    @flag color: boolean = false,
    // FIXME: Validation not working for now:
    // https://deepkit.io/documentation/framework/cli
    @flag year: number & Positive = 13,
  ): void {
    this.userManager.addUser({ username: 'Peter' })
    title = `Hello, ${title} @${year}`
    if (color) {
      title = `<yellow>${title}</yellow>`
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

void new App({
  controllers: [TestCommand],
  listeners: [ServerListener],
  providers: [UserManager],
  imports: [
    new FrameworkModule({
      // debug: true,
    }),
  ],
})
  .run()
  // eslint-disable-next-line no-console
  .catch(console.log)
