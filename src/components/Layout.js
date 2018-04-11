import React, { Component } from 'react'
import Footer from './Footer'

const Fragment = React.Fragment
export default class Layout extends Component {
  componentWillMount () {
    console.log(this.props)
  }
  render () {
    return (
      <Fragment>
        {
          this.props.children
        }
        <Footer {...this.props} />
      </Fragment>
    )
  }
}
