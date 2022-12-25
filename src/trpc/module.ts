import { createModule } from '@deepkit/app'

import { TrpcController } from './controller'

export class TrpcModule extends createModule({
  controllers: [TrpcController],
  providers: [],
}) {}
