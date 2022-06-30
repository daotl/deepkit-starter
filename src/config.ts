import type { Positive } from '@deepkit/type'

export class HelloConfig {
  title: string = 'World'
  color: string = 'yellow'
  year: number & Positive = 2022
}

export class Config {
  env: string = 'production'
  hello: HelloConfig = new HelloConfig()
}
