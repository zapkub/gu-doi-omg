
import * as React from 'react'
import * as PropTypes from 'prop-types';
import Loadable from 'react-loadable'
import { Link, Route } from './Router'

const Landing = Loadable<any, any>({
  loader: () => import('./landing'),
  loading: () => <div>{'load'}</div>,
});

const Authentication = Loadable({
  loader: () => import('./authentication'),
  loading: () => <div>{'loading'}</div>
})



export default class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      hide: false
    }
  }
  render() {
    return (
      <div>
        {'My No. 2914+++ boiler plated ja'}
        {'yeah..kdsjidjfijfk.'}
        {this.state.hide ? 'hide': 'show'}
        <button onClick={() => this.setState({ hide: !this.state.hide})}>{'hide'}</button>
        {this.state.hide ? <Landing /> : ''}
        {!this.state.hide ? <Authentication /> : ''}

        <Authentication />
        <Landing />
          {/* <Route path='/' render={() => <Landing />} />
          <Route path='/login' render={() => <Authentication />} /> */}
      </div>
    )
  }
}
