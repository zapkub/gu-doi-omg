import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import * as React from 'react'

const Landing = Loadable({
  loader: () => import('./landing'),
  loading: () => <div>{'loading'}</div>
})

const Authentication = Loadable({
  loader: () => import('./authentication'),
  loading: () => <div>{'loading'}</div>
})

export default () => (
  <div>
    <Route component={Landing} path='/' exact key='home' />
    <Route component={Authentication} path='/login' key='authentication' />
  </div>
)
