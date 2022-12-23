import type { Positive } from '@deepkit/type'

import { AuthConfig } from './auth'

export class HelloConfig {
  title: string = 'World'
  color: string = 'yellow'
  year: number & Positive = 2022
}

export class Config {
  debug: boolean = false
  logFormat: string = 'text'

  auth: AuthConfig = new AuthConfig()
  hello: HelloConfig = new HelloConfig()
}
