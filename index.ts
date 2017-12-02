import config from './config'
import logger from './utils/logger'

import enhanceClientRouter from './utils/client-request-handler'
// import enhanceGraphQLRouter from ''

const express = require('express')

const app = express()
/**
 * SETUP ROUTES
 * @todo
 * [x] development client route
 * [ ] production client route
 * [ ] grpahql server route
 * [ ] authentication route
 */
enhanceClientRouter(app)

if (config.isDev) {
  logger.log('App: start in development mode')
}

app.listen(3000, function () {
  console.log('app started on 3000')
})
