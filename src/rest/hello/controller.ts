import { http, HttpQuery } from '@deepkit/http'
import { PrismaClient } from '@prisma/client'

@http.controller()
export default class HelloController {
  constructor(protected prisma: PrismaClient) {}

  @http.GET('/api/hello/:name')
  async hello(name: string, message?: HttpQuery<string>): Promise<string> {
    const users = await this.prisma.user.findMany({ where: { name } })
    const email = users && users[0] ? ` Your email is ${users[0].email}` : ''
    return `Hello ${name}! ${email} ${message ?? 'No message'}`
  }
}
