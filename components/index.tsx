import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import MainApp from './App'
import { BrowserRouter as Router } from 'react-router-dom'

(window as any).main = function () {
  async function mountApp(App) {
    console.log('Mount !!')
    const rootDOM = document.getElementById('root')
    ReactDOM.hydrate(
      <Router>
          <App />
      </Router>
      , rootDOM)
  }
  mountApp(MainApp)
  if (module.hot) {
    module.hot.accept('./App', async () => {
      console.log('Rerender app')
      mountApp(MainApp)
    })
  }
}

