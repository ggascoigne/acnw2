import Typography from '@material-ui/core/Typography'
import { Page } from 'src/components/Acnw/Page'
import React from 'react'

export const Credits = () => (
  <Page>
    <Typography variant='h3' color='inherit'>
      Credits
    </Typography>
    <ul>
      <li>
        The table control used throughout this site is{' '}
        <a href='https://github.com/tannerlinsley/react-table' title='React-Table'>
          React-Table
        </a>{' '}
        by Tanner Linsley.
      </li>
      <li>
        The UI toolkit is{' '}
        <a href='https://material-ui.com/' title='Material-UI'>
          {' '}
          Material UI
        </a>
      </li>
      <li>
        Parts based on{' '}
        <a href='https://demos.creative-tim.com/material-kit-react' title='Material Kit React'>
          Material Kit React
        </a>
      </li>
      <li>
        Various useful utilities from from <a href='https://usehooks.com'> Use Hooks</a>
      </li>
    </ul>
  </Page>
)
