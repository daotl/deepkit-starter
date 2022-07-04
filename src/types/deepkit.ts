import type { HttpRequest, HttpResponse } from '@deepkit/http'

export interface DeepkitHttpContext {
  req: HttpRequest
  res: HttpResponse
}
