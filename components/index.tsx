import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import MainApp from './App'

(window as any).main = function () {
  function mountApp(App) {
    const rootDOM = document.getElementById('root')
    ReactDOM.hydrate(<AppContainer><App /></AppContainer>, rootDOM)
  }
  
  mountApp(MainApp)
  if (module.hot) {
    module.hot.accept('./App', () => { mountApp(MainApp) })
  }
}

