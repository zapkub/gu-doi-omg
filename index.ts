const express = require('express')
import addClientRouter from './utils/client-request-handler'
const app = express()

addClientRouter(app)


app.listen(3000, function() {
  console.log('app started on 3000')
})