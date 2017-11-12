import * as React from 'react'
import * as PropTypes from 'prop-types';
import { Component } from 'react';

class Link extends React.Component<{to: string},{}> {
  pushRoute() {
    console.log('navigation browser to', this.props.to)
    window.history.pushState({}, '', this.props.to)
  }
  render() {
    return <button onClick={this.pushRoute.bind(this)}>{'Link'}</button>
  }
}

class Route extends React.Component<{ path: string, render: any }, {}>{
  render() {
    const isMatch = this.context.match(this.props.path)
    if(isMatch) {console.log('render...', this.props.path)}
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
    window.addEventListener('changestate', function(e) {
      console.log('URL changed');
    });
  }
  getChildContext() {
    return {
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
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

(PlainlessRouter as any).childContextTypes = {
  match: PropTypes.func,
  url: PropTypes.any
}