import { Arg, Query, Resolver } from 'type-graphql'

import { Person, PersonInput } from './schema'

@Resolver()
export default class PersonResolver {
  @Query(
    () => Person,
    // { nullable: true }
  )
  person(
    @Arg('personInput', () => PersonInput) personInput: PersonInput,
  ): Person | undefined {
    return {
      name: personInput.name,
      tags: ['Developer', 'China'],
    }
  }
}
