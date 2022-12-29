import { http, HttpResponse } from '@deepkit/http'

import { authGroup } from '~/auth'
import { EdgedbClient } from '~/edgedb'

@http.controller()
export class SseController {
  constructor(private edgedb: EdgedbClient) {}

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
