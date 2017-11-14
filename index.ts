import config from './config'
import logger from './utils/logger'
import addClientRouter from './utils/client-request-handler'
const express = require('express')

const app = express()
addClientRouter(app)

if(config.isDev) {
  logger.log('App: start in development mode')
  const disposer = require('./utils/module-disposer').default
  disposer()
}

app.listen(3000, function() {
  console.log('app started on 3000')
})