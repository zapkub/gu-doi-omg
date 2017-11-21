
import * as React from 'react'
import Routes from './Routes'
import { Link } from 'react-router-dom'



export default class App extends React.Component<{}, {}>{
  render() {
    return <div>
      {'React, Typescript,SSR and Code-split'}
      <br />
      <Link to='/'>{'home'}</Link>
      <Link to='/login'>{'login'}</Link>
      <Routes />
    </div>
  }
} 
