import type { User } from '~/models'
import type { DeepkitHttpContext } from '~/types/deepkit'

export type HttpContext = DeepkitHttpContext & {
  user?: User
}
