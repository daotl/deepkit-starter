import { http, HttpQuery } from '@deepkit/http'
import { Group } from '@deepkit/type'

import { authGroup } from '~/auth'
import { e, EdgedbClient } from '~/edgedb'

class Person {
  private password: Group<'secret'> & string = 'secret'

  constructor(
    private name: string,
    private email: string,
    private motto: string,
  ) {}
}

@http.controller()
export class HelloController {
  constructor(private edgedb: EdgedbClient) {}

  @http.GET('/api/hello/:name').use(authGroup('public'))
  @http.serialization({ groupsExclude: ['secret'] })
  async hello(name: string, motto?: HttpQuery<string>): Promise<Person> {
    const users = await e
      .select(e.User, (u) => ({
        filter: e.op(u.name, '=', name),
        ...e.User['*'],
      }))
      .run(this.edgedb)
    const email = users && users[0] ? ` Your email is ${users[0].email}` : ''
    return new Person(name, email, motto ?? 'No motto')
    // return `Hello ${name}! ${email} ${motto ?? 'No motto'}`
  }
}
