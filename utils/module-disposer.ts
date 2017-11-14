import logger from './logger'
const chokidar = require('chokidar')
const watcher = chokidar.watch([
  './components/**/*.js',
  './graphql/**/*.js'
])

export default function () {
  watcher.on('ready', function () {
    logger.log('Disposer: watcher is ready!')
    watcher.on('all', function (event, path) {
      logger.log("Clearing module cache from server...")
      Object.keys(require.cache).forEach(function (id) {
        if (/App/.test(id)) {
          logger.log(id)
          delete require.cache[id]
        }
      })
    })
  })

}