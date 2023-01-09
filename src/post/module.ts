import { createModule } from '@deepkit/app'

import { PostRouter } from './router'

export class PostModule extends createModule({
  providers: [PostRouter],
  exports: [PostRouter],
}) {}
