

import * as React from 'react'
import { add, getComponent as getCacheComponent } from './getLoadable'
export default (getComponent) => {
  let cacheIndex;
  class Loadable extends React.Component {
    static getComponent = getComponent
    constructor(props) {
      super()
      this.state = {}
    }
    componentWillMount() {
      if (typeof window === 'undefined') {
        console.log('add to server queue')
        cacheIndex = add(getComponent)
        return
      } else {
        cacheIndex = add(getComponent)
        if(__LOADED__[cacheIndex]) {
          this.setState({
            Component: __LOADED__[cacheIndex]
          })
        }
      }
    }
    render() {
      if (typeof window === 'undefined') {
        console.log('draw ssr', getCacheComponent(cacheIndex))
        // return <div/>
        return getCacheComponent(cacheIndex)() || <div>{'err'}</div>
      }

      const { Component } = this.state
      return Component ? <Component /> : 'loading...'
    }
  }
  return Loadable
}