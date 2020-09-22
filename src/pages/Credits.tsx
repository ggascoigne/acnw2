import Typography from '@material-ui/core/Typography'
import { Page } from 'components/Acnw/Page'
import React from 'react'

export const Credits = () => (
  <Page>
    <Typography variant='h3' color='inherit'>
      Credits
    </Typography>
    <a
      href='https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss'
      target='_blank'
      rel='noopener noreferrer'
    >
      <img
        width='150'
        height='50'
        alt='JWT Auth for open source projects'
        src='//cdn.auth0.com/oss/badges/a0-badge-light.png'
      />
    </a>{' '}
    Token Based Authentication for open source projects.
    <ul>
      <li>
        The table control used throughout this site is{' '}
        <a href='https://github.com/tannerlinsley/react-table' title='React-Table' target='_new'>
          React-Table
        </a>{' '}
        by Tanner Linsley.
      </li>
      <li>
        The UI toolkit is{' '}
        <a href='https://material-ui.com/' title='Material-UI' target='_new'>
          {' '}
          Material UI
        </a>
      </li>
      <li>
        Parts based on{' '}
        <a href='https://demos.creative-tim.com/material-kit-react' title='Material Kit React' target='_new'>
          Material Kit React
        </a>
      </li>
      <li>
        Various useful utilities from from{' '}
        <a href='https://usehooks.com' target='_new'>
          {' '}
          Use Hooks
        </a>
      </li>
      <li>
        The Old Stamper font used in the "virtual" convention overlay is from{' '}
        <a href='https://www.dafont.com/typesgal.d3983' target='_new'>
          https://www.dafont.com/typesgal.d3983
        </a>
      </li>
    </ul>
  </Page>
)
