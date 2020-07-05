///<reference types="webpack-env" />
import 'react-app-polyfill/ie11'

import { ApolloProvider } from '@apollo/react-hooks'
import client from 'src/client/client'
import { Auth0Provider } from 'src/components/Acnw'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { useAuth } from './components/Acnw/Auth/Auth0'
import registerServiceWorker from './utils/registerServiceWorker'

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const whyDidYouRender = require('@welldone-software/why-did-you-render')
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   })
// }

const rootElement = document.getElementById('root')

const RootComponent: React.FC = ({ children }) => (
  <BrowserRouter>
    <Auth0Provider>
      <ApolloProvider client={client(useAuth())}>{children}</ApolloProvider>
    </Auth0Provider>
  </BrowserRouter>
)

const render = (Component: React.ComponentType) =>
  ReactDOM.render(
    <RootComponent>
      <Component />
    </RootComponent>,
    rootElement
  )

render(App)

// if ((module as NodeModule).hot) {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   ;(module as NodeModule).hot!.accept('./App', () => render(require('./App').default))
// }

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

// registerServiceWorker()
