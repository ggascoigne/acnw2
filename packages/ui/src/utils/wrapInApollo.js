import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import { loader } from 'graphql.macro'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

const schema = loader('../client/schema.graphql')

const cache = new InMemoryCache()

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  // resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

const client = new ApolloClient({
  link: new SchemaLink({ schema: executableSchema }),
  cache
})

// used in tests only
const wrapInApollo = child => <ApolloProvider client={client}> {child}</ApolloProvider>

export default wrapInApollo