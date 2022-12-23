import type { User } from '@prisma/client'

import type { DeepkitHttpContext } from '~/types/deepkit'

export type HttpContext = DeepkitHttpContext & {
  user?: User
}
