import Typography from '@material-ui/core/Typography'
import Quote from 'src/components/MaterialKitReact/Typography/Quote'
import React from 'react'

export const GraphQLError = ({ error }) => {
  console.log(JSON.stringify(error, null, 2))
  const networkErrors = error?.networkError?.result?.errors
  return (
    <>
      <Typography variant='h3' color='inherit'>
        GraphQL Error
      </Typography>
      {error.message && <Quote text={error.message} />}
      {error.graphQLErrors && error.graphQLErrors.length !== 0 && (
        <Quote text={JSON.stringify(error.graphQLErrors, null, 2)} />
      )}
      {networkErrors && networkErrors.map((e, i) => <Quote key={i} text={e.message} />)}
    </>
  )
}
