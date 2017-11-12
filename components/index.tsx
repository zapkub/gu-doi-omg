import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import MainApp from './App'

async function mountApp(Component) {
  const rootDOM = document.getElementById('root')
  ReactDOM.hydrate(<AppContainer><Component /></AppContainer>, rootDOM)
}

mountApp(App)

if (module.hot) {
  module.hot.accept('./App', () => { mountApp(App) })
}

