import React, {Component} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import asyncComponent from 'utils/asyncComponent'
import {Layout} from 'components'
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
            <Switch>
              <Route path='/index' exact component={(props) => <Layout {...props}><Index {...props}/></Layout> } />
              <Route path='/list' exact component={(props) => <Layout {...props}><List {...props}/></Layout> } />
              <Route path='/wallet' exact component={(props) => <Layout {...props}><Wallet {...props}/></Layout> } />
              <Route path='/user' exact component={(props) => <Layout {...props}><User {...props}/></Layout> } />
            </Switch>
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

