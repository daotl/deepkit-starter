import { http, HttpQuery } from '@deepkit/http'
import { Group } from '@deepkit/type'
import { PrismaClient } from '@prisma/client'

import { authGroup } from '~/auth'

class Person {
  protected password: Group<'secret'> & string = 'secret'

  constructor(
    protected name: string,
    protected email: string,
    protected motto: string,
  ) {}
}

@http.controller()
export class HelloController {
  constructor(protected prisma: PrismaClient) {}

  @http.GET('/api/hello/:name').use(authGroup('public'))
  @http.serialization({ groupsExclude: ['secret'] })
  async hello(name: string, motto?: HttpQuery<string>): Promise<Person> {
    const users = await this.prisma.user.findMany({ where: { name } })
    const email = users && users[0] ? ` Your email is ${users[0].email}` : ''
    return new Person(name, email, motto ?? 'No motto')
    // return `Hello ${name}! ${email} ${motto ?? 'No motto'}`
  }
}
