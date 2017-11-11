import { Request, Response } from 'express'
import * as React from 'react'
import * as fs from 'fs'
import * as path from 'path'
import { renderToString } from 'react-dom/server'

const express = require('express')

const webpack = require('webpack')
const webpackDevServerMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const devServer = express()
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
    hot: true
  }))
  app.use(webpackHotMiddleware(compiler))


  app.get('*', (req: Request, res: Response) => {
    clearRequireCache()
    const App = require('../components/App').default
    const RenderedApp = renderToString(<App />)
    console.log(RenderedApp)
    let html = __html.replace('{{app-root}}', RenderedApp)
    res.send(html)
  })

}