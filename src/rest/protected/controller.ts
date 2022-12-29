import { http } from '@deepkit/http'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'
import { EdgedbClient } from '~/edgedb'
import { User } from '~/models'

@http
  .controller()
  .resolveParameterByName('user', AutenticatedUserParameterResolver)
export class ProtectedController {
  constructor(private edgedb: EdgedbClient) {}

  @http.GET('/api/protected').use(authGroup('protected'))
  protected(user: User): string {
    return `hi ${user.name}`
  }
}
