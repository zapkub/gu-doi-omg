require('dotenv').config({})



export default {
  get isDev() {
    return process.env.NODE_ENV !== 'production'
  }
}