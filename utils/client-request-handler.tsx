import { Request, Response } from 'express'
import * as React from 'react'
import * as fs from 'fs'
import * as path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { getBundles } from 'react-loadable/webpack'
import logger from './logger'
const Loadable = require('react-loadable')
const webpack = require('webpack')
const webpackDevServerMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

/**
 * Development disposer for lazy
 * UI require with no app restart
 */

const chokidar = require('chokidar')
const watcher = chokidar.watch(['./components/**/*.js', './graphql/**/*.js'])

watcher.on('ready', function onWatcherReady() {
  logger.log('Clearing module cache from server...')
  Object.keys(require.cache).forEach(function(id) {
    if (/\/components\//.test(id)) {
      logger.log(id)
      delete require.cache[id]
    }
  })
})

const compiler = webpack(require('../webpack.config'))
const htmlTemplate = fs.readFileSync(path.join(__dirname, '../index.html')).toString()

export default app => {
  /**
   * Dev server
   */
  app.use(
    webpackDevServerMiddleware(compiler, {
      publicPath: '/public/',
      hot: true,
      stats: 'minimal'
    })
  )
  app.use(webpackHotMiddleware(compiler))

  app.get('*', async (req: Request, res: Response) => {
    // require App here for dynamic change
    // in development environment
    const App = require('../components/App').default
    const stats = require('../public/react-loadable.json')
    try {
      const modules = []
      await Loadable.preloadAll()

      const RenderedApp = renderToString(
        <StaticRouter location={req.url} context={{}}>
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <App />
          </Loadable.Capture>
        </StaticRouter>
      )

      let bundles = getBundles(stats, modules)
      const PreloadModule = bundles
        .map(bundle => {
          if (/.+\.map/.test(bundle.file)) {
            return ''
          }
          return `<script src="/public/${bundle.file}"></script>`
        })
        .join('\n')
      let html = htmlTemplate.replace('{{app-root}}', RenderedApp)
      html = html.replace('{{server-script}}', PreloadModule)

      res.send(html)
    } catch (e) {
      console.error(e)
      res.status(500).send(e.toString())
    }
  })
}
