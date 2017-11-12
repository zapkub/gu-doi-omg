import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

async function mountApp(Component) {
  const rootDOM = document.getElementById('root')
  await Loadable.preloadReady()
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>, rootDOM)
}

mountApp(App)

if (module.hot) {
  module.hot.accept('./App', async () => { 
    await Loadable.preloadReady()
    mountApp(App) 
  })
}

