import React from 'react'
import App from './App'
import {render} from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import mobxRouter from 'utils/mobxRouter'
import stores from 'model'
const history = createHistory()
mobxRouter(history)
render(
  <Provider store={stores}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
