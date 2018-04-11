import React, { Component } from 'react'

export default class Index extends Component {
  
  componentWillMount () {
    console.log(this.props)
  }
  
  render () {
    return (
      <div>
        this is index !!!
      </div>
    )
  }
}
