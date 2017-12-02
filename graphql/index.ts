import logger from '../utils/logger'
import { GQC } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'

declare global {
  namespace GraphQL {
    interface Context {
      
    }
  }
}

export default function createGraphQLRoute() {

  /**
   * test
   */

}
