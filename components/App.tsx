
import * as React from 'react'
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
        <Link to='/login'>{'login'}</Link>
        <Link to='/'>{'home'}</Link>
        {'My No. 2914+++ boiler plated ja'}
          <Route path='/' render={() => <Landing />} />
          <Route path='/login' render={() => <Authentication />} />
      </div>
    )
  }
}