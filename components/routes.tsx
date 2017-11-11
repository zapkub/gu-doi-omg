
import * as React from 'react'
// import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

import Landing from './landing'

// const Landing = Loadable<any, any>({
//   loader: () => import('./landing'),
//   loading: () => <div>{'load'}</div>,
// });

// const Authentication = Loadable<any, any>({
//   loader: () => import('./Authentication'),
//   loading: () => <div>{'load'}</div>,
// })

// const LandingWrap = () => {
//   return (
//     <div>
//       {'test'}
//       <Landing />
//     </div>
//   )
// }
// export default LandingWrap
// // export default () => [
// //   <Route component={Authentication} path='/login' key='authentication' />,
// //   <Route component={LandingWrap} path='/home' key='landing' />
// // ]

export default () => (
  <div>
    <Route key='home' component={Landing} path='/home' />
    <Route key='home' component={Landing} path='/' />
  </div>
)