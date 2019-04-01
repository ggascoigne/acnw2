import { GetGames, GetGamesVariables, GetGames_games_edges } from '__generated__/GetGames'
import { GetSlots_slots_nodes } from '__generated__/GetSlots'
import { GAME_FRAGMENT, PROFILE_FRAGMENT } from 'client/fragments'
import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

import { GraphQLError } from '../GraphQLError'
import { Loader } from '../Loader'

const QUERY_GAMES = gql`
  query GetGames($year: Int!, $slotId: Int!) {
    games(condition: { year: $year, slotId: $slotId }, orderBy: [SLOT_ID_ASC, NAME_ASC]) {
      edges {
        node {
          ...gameFields
          gameAssignments(filter: { gm: { lessThan: 0 } }) {
            nodes {
              gm
              member {
                user {
                  profile {
                    ...profileFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${GAME_FRAGMENT}
  ${PROFILE_FRAGMENT}
`

interface IGameQuery {
  year: number
  slot: GetSlots_slots_nodes
  children(props: IGameQueryChild): React.ReactNode
}

export interface IGameQueryChild {
  year: number
  slot: GetSlots_slots_nodes
  games?: GetGames_games_edges[]
}

export const GameQuery: React.FC<IGameQuery> = ({ year, slot, children }) => {
  return (
    <Query<GetGames, GetGamesVariables>
      query={QUERY_GAMES}
      key={`slot_${slot.id}`}
      variables={{ year: year, slotId: slot.id }}
      errorPolicy='all'
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loader />
        }
        if (error) {
          return <GraphQLError error={error} />
        }
        const games = data && data.games ? data.games.edges : undefined
        return children && children({ year, slot, games })
      }}
    </Query>

    /*
    <GqlQuery<GetGames, GetGamesVariables>
      key={`slot_${slot.id}`}
      query={QUERY_GAMES}
      variables={{ year: year, slotId: slot.id }}
      errorPolicy='all'
    >
      {data => children && children({ year, slot, games: get(data, 'games.edges') })}
    </GqlQuery>
*/
  )
}