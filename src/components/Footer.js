import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './footer.less'
export default class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      footerList: [
        {
          name: '首页',
          icon: 'index'
        },
        {
          name: '列表',
          icon: 'list'
        },
        {
          name: '钱包',
          icon: 'wallet'
        },
        {
          name: '我的',
          icon: 'user'
        }
      ]
    }
  }
  componentWillMount () {
    console.log(this.props)
  }
  render () {
    const {footerList} = this.state
    const {pathname} = this.props.location
    return (
      <div className='footer'>
        <ul>
          {
            footerList.map((value, index) => (
              <li key={index} className={`${pathname.indexOf(value.icon) > -1 ? 'active' : ''}`}>
                <Link to={`/${value.icon}`}>
                  <span className={`iconfont ${value.icon}`} />
                  <p>{value.name}</p>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
