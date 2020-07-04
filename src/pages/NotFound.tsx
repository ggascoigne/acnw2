import Typography from '@material-ui/core/Typography'
import { Page } from 'src/components/Acnw/Page'
import SnackbarContent from 'src/components/MaterialKitReact/Snackbar/SnackbarContent'
import React from 'react'

export const NotFound = () => (
  <Page>
    <SnackbarContent
      message={
        <span>
          <b>404:</b> Page not found...
        </span>
      }
      color='danger'
      icon='error_outline'
    />
    <Typography variant='body1' color='inherit'>
      Sorry, that link no longer exists.
    </Typography>
  </Page>
)
