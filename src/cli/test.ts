import { type Command, arg, cli, flag } from '@deepkit/app'
import { Logger } from '@deepkit/logger'
import type { Positive } from '@deepkit/type'
import { PrismaClient } from '@prisma/client'

import { Config } from '~/config'

@cli.controller('test', {
  description: 'My super first command',
})
export class TestCommand implements Command {
  constructor(
    protected config: Config['hello'],
    protected prisma: PrismaClient,
    protected logger: Logger,
  ) {}

  async execute(
    @arg title?: string,
    @flag color: boolean = false,
    // FIXME: Validation not working for now:
    // https://deepkit.io/documentation/framework/cli
    @flag year?: number & Positive,
  ): Promise<void> {
    const users = await this.prisma.user.findMany()
    this.logger.log('Existing users:')
    users.forEach((u) => this.logger.log(u))

    title ??= this.config.title
    title = `Hello, ${title} @${year ?? this.config.year}`
    if (color) {
      const c = this.config.color
      title = `<${c}>${title}</${c}>`
    }
    this.logger.log(title)
  }
}
