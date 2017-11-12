import * as React from 'react'
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class Link extends React.Component<{ to: string }, {}> {
  pushRoute() {
    console.log('navigation browser to', this.props.to)
    window.history.pushState({ path: this.props.to }, '', this.props.to)
  }
  render() {
    return <button onClick={this.pushRoute.bind(this)}>{'Link'}</button>
  }
}

class Route extends React.Component<{ path: string, render: any }, {}>{
  render() {
    const isMatch = this.context.match(this.props.path)
    if (isMatch) { console.log('render...', this.props.path) }
    return isMatch ? this.props.render() : <div />
  }
}
(Route as any).contextTypes = {
  match: PropTypes.func,
  url: PropTypes.any
}
export { Route, Link }
export default class PlainlessRouter extends React.Component<{ location?: any }, {}> {
  componentDidMount() {
    console.log('listen to history')
    const pushState = window.history.pushState
    const setState = this.setState.bind(this)
    window.history.pushState = function (state, title, url) {
      console.log('push', url)
      setState({currentPath: url})
      return pushState.apply(window.history, arguments);
    }
  }
  getChildContext() {
    return {
      url: this.props.location || window.location.pathname,
      match: (path: string) => {
        if (typeof window !== 'undefined') {
          console.log(window.location)
          return path === window.location.pathname
        } else {
          console.log(this.props.location)
          console.log(this.props.location === path)
          return this.props.location === path
        }
      }
    }
  }
  constructor(props){
    super()
    this.state = {
      currentPath: 'init'
    }
  }
  render() {
    return (
      <div>{this.state.currentPath}{this.props.children}</div>
    )
  }
}

(PlainlessRouter as any).childContextTypes = {
  match: PropTypes.func,
  url: PropTypes.any
}