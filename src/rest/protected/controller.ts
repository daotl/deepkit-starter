import { http } from '@deepkit/http'

import { AuthenticatedUserParameterResolver, authGroup } from '~/auth'
import { EdgedbClient } from '~/edgedb'
import { User } from '~/models'

@http
  .controller()
  .resolveParameterByName('user', AuthenticatedUserParameterResolver)
export class ProtectedController {
  constructor(private edgedb: EdgedbClient) {}

  @http.GET('/api/protected').use(authGroup('protected'))
  protected(user: User): string {
    return `hi ${user.name}`
  }
}
