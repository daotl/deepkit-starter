import type { Positive } from '@deepkit/type'

export class HelloConfig {
  title: string = 'World'
  color: string = 'yellow'
  year: number & Positive = 2022
}

export class Config {
  hello: HelloConfig = new HelloConfig()
}
