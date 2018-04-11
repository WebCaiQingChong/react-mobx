import React, { Component } from 'react'

export default class List extends Component {
  
  componentWillMount () {
    console.log(this.props)
  }
  
  render () {
    return (
      <div>
        this is list !!!
      </div>
    )
  }
}
