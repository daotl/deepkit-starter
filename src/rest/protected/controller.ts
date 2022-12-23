import { http } from '@deepkit/http'
import { PrismaClient, User } from '@prisma/client'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'

@http
  .controller()
  .resolveParameterByName('user', AutenticatedUserParameterResolver)
export default class ProtectedController {
  constructor(protected prisma: PrismaClient) {}

  @http.GET('/api/protected').use(authGroup('protected'))
  protected(user: User): string {
    return `hi ${user.name as string}`
  }
}
