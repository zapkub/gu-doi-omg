import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

declare global {
  interface NodeModule {
    hot: any
  }
}

async function mountApp(Component) {
  await (Loadable as any).preloadReady()
  const rootDOM = document.getElementById('root')
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>, rootDOM)
}
( window as any ).startApp = () => {
  mountApp(App)
}

if (module.hot) {
  module.hot.accept('./App', async () => {
    await (Loadable as any).preloadReady()
    mountApp(App)
  })
}

