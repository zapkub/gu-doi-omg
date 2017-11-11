
import * as React from 'react'
import Loadable from 'react-loadable'

const Landing = Loadable<any, any>({
  loader: () => import('./landing'),
  loading: () => <div>{'load'}</div>,
});

export default () => (
  <div>
    {'My No. 2914+++ boiler plated ja'}
    <Landing />
  </div>
)