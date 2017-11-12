import { Request, Response } from 'express'
import * as React from 'react'
import * as fs from 'fs'
import * as path from 'path'
import { renderToString } from 'react-dom/server'
import { getBundles } from 'react-loadable/webpack'
import Router from '../components/Router'

const Loadable = require('react-loadable')

const webpack = require('webpack')
const webpackDevServerMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const compiler = webpack(require('../webpack.config'))

const __html = fs.readFileSync(path.join(__dirname, '../index.html')).toString()

function clearRequireCache() {
  const keys = Object.keys(require.cache)
    .filter(key => /.+\/components/.test(key))
    .forEach(key => {
      console.log(`dispose: ${key}`)
      delete require.cache[key]
    })
}

export default (app: Express.Application) => {

  /** 
   * Dev server
  */
  app.use(webpackDevServerMiddleware(compiler, {
    publicPath: '/public/',
    hot: true,
    stats: 'minimal'
  }))
  app.use(webpackHotMiddleware(compiler))


  app.get('*', async (req: Request, res: Response) => {
    clearRequireCache()
    const stats = require('../public/react-loadable.json')
    const App = require('../components/App').default

    const modules = []
    await Loadable.preloadAll()
    const RenderedApp = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Router location={req.url}>
          <App />
        </Router>
      </Loadable.Capture>)

    let bundles = getBundles(stats, modules)
    const PreloadModule = bundles.map(bundle => {
      if (/.+\.map/.test(bundle.file)) {
        return ''
      }
      return `<script src="/public/${bundle.file}"></script>`
    }).join('\n')

    let html = __html.replace('{{app-root}}', RenderedApp)
    html = html.replace('{{server-script}}', PreloadModule)

    res.send(html)
  })

}