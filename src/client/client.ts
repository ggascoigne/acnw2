import ApolloClient, { InMemoryCache } from 'apollo-boost'
import type { Operation } from 'apollo-link'
import { gameFilterStore, urlSourceStore } from 'src/client/resolvers'

import type { Auth0ContextType } from '../components/Acnw/Auth/Auth0'

// this pattern is based upon https://hackernoon.com/setting-up-apollo-link-state-for-multiple-stores-4cf54fdb1e00

/**
 * At a given attribute this will merge all objects
 * in a list of objects found at that attribute.
 *
 * Example
 * const objectList = [
 *   {defaults: {x: true}},
 *   {defaults: {y: "foo"}},
 *   {defaults: {z: 123}}
 * ]
 *
 * // returns {x: true, y: "foo", z: 123}
 * mergeGet("defaults")(objectList)
 */
export const mergeGet = (attributeName: string) => (input: any[]) =>
  input.reduce((prev, curr) => {
    return { ...prev, ...curr[attributeName] }
  }, {})

const STORES = [gameFilterStore, urlSourceStore]

const cache = new InMemoryCache({
  // postgraphile uses nodeId for the uuid, and leaves id as the database id.
  dataIdFromObject: (obj: any) => obj.nodeId || null,
})

const Client = (authProps: Auth0ContextType) =>
  new ApolloClient({
    uri: '/api/graphql',
    request: async (operation: Operation) => {
      const { getTokenSilently, isAuthenticated } = authProps
      if (isAuthenticated) {
        const token = getTokenSilently && (await getTokenSilently())
        operation.setContext({
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        })
      }
    },
    cache,
    // @ts-ignore
    resolvers: {
      Mutation: mergeGet('mutations')(STORES),
    },
  })

cache.writeData({ data: mergeGet('defaults')(STORES) })

export default Client
