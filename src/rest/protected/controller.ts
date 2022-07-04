import { http } from '@deepkit/http'
import { PrismaClient } from '@prisma/client'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'
import { UserCls } from '~/model'

@http.controller().resolveParameter(UserCls, AutenticatedUserParameterResolver)
export default class ProtectedController {
  constructor(protected prisma: PrismaClient) {}

  @http.GET('/api/protected').use(authGroup('protected'))
  protected(user: UserCls): string {
    return `hi ${user.name as string}`
  }
}
