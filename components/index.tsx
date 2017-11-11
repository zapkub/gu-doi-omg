import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import MainApp from './App'
import Loadable from 'react-loadable';

(window as any).main = function () {
  async function mountApp(App) {
    await Loadable.preloadReady()
    const rootDOM = document.getElementById('root')
    ReactDOM.hydrate(<AppContainer><App /></AppContainer>, rootDOM)
  }
  
  mountApp(MainApp)
  if (module.hot) {
    module.hot.accept('./App', () => { mountApp(MainApp) })
  }
}

