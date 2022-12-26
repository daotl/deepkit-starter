import { http, HttpResponse } from '@deepkit/http'
import { PrismaClient } from '@prisma/client'

import { authGroup } from '~/auth'

@http.controller()
export class SseController {
  constructor(protected prisma: PrismaClient) {}

  @http.GET('/api/sse').use(authGroup('public'))
  sse(resp: HttpResponse): void {
    resp.writeHead(200, {
      'Content-Type': 'text/event-stream',
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
