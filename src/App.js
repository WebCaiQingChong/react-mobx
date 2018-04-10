import React, {Component} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import asyncComponent from 'utils/asyncComponent'
import './index.less'

const Index = asyncComponent(() => import('./pages/Index'))
const List = asyncComponent(() => import('./pages/List'))
const Wallet = asyncComponent(() => import('./pages/Wallet'))
const User = asyncComponent(() => import('./pages/User'))

const Fragment = React.Fragment
export default class App extends Component {
  render () {
    return (
      <Fragment>
        <Router history={this.props.history}>
          <Switch>
            <Route path='/' exact render={() => (<Redirect to='/index' />)} />
            <Route path='/index' exact component={Index} />
            <Route path='/list' exact component={List} />
            <Route path='/wallet' exact component={Wallet} />
            <Route path='/user' exact component={User} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}
