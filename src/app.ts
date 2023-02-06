#!/usr/bin/env ts-node-script
import 'module-alias/register'

import { App } from '@deepkit/app'
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
import { registerStaticHttpController } from '@deepkit/http'
import { JSONTransport, Logger } from '@deepkit/logger'
import * as e from 'edgedb'

import { AuthModule } from '~/auth'
import { TestCommand } from '~/cli'
import { Config } from '~/config'
import { EdgedbClient /* , EdgedbUtil */ } from '~/edgedb'
import { HelloModule } from '~/hello'
import { PostModule } from '~/post'
import { HelloController, ProtectedController, SseController } from '~/rest'
import { TrpcModule } from '~/trpc'

const edgedbClient = e.createClient()
// const edgedbUtil = new EdgedbUtil(edgedbClient)

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
  onServerMainBootstrap(_event: typeof onServerMainBootstrap.event): void {
    this.logger.log('Main process: Application server bootstrap.')
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
  onServerMainShutdown(_event: typeof onServerMainShutdown.event): void {
    this.logger.log('Main process: Application server shut down.')
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
    new HelloModule(),
    new PostModule(),
  ],
  controllers: [
    TestCommand,
    HelloController,
    ProtectedController,
    SseController,
  ],
  middlewares: [],
  listeners: [ServerListener],
  providers: [
    { provide: EdgedbClient, useValue: edgedbClient },
    // { provide: EdgedbUtil, useValue: edgedbUtil },
  ],
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
    registerStaticHttpController(module, {
      path: '/',
      localPath: 'public',
      controllerName: 'StaticController',
    })
  })

app
  .run()
  // eslint-disable-next-line no-console
  .catch(console.log)
