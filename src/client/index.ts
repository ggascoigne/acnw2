import type { GetGamesBySlotQuery } from './graphql'

export * from './graphql'

export type GameArray = NonNullable<GetGamesBySlotQuery['games']>['edges']
