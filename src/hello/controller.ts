import { http, HttpQuery, HttpResponse } from '@deepkit/http'
import { Group } from '@deepkit/type'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'
import { e, EdgedbClient } from '~/edgedb'
import { type User } from '~/models'

class Person {
  private password: Group<'secret'> & string = 'secret'

  constructor(
    private name: string,
    private email: string,
    private motto: string,
  ) {}
}

@http
  .controller()
  .resolveParameterByName('user', AutenticatedUserParameterResolver)
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

  @http.GET('/api/protected').use(authGroup('protected'))
  protected(user: User): string {
    return `Hi ${user.name}`
  }

  @http.GET('/api/sse').use(authGroup('public'))
  sse(resp: HttpResponse): void {
    // See: https://serverfault.com/a/801629
    resp.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    })
    let i = 0
    const timer: NodeJS.Timer = setInterval(() => {
      if (i < 10) {
        resp.write(`data: ${i++}\n\n`)
      } else {
        clearInterval(timer)
        resp.write('event: close\n')
        resp.end('data: \n\n')
      }
    }, 1000)
  }
}
