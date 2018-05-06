import React, { Component } from 'react'


const Fragment = React.Fragment
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
  }
  
  render () {
    const {a} = this.props
    const {count} = this.state
    console.log(count)
    return (
      <Fragment>
        <p>this is {a}</p>
        <button onClick={this.handleClick.bind(this)}>确定</button>
      </Fragment>
    )
  }
  handleClick (e) {
    let {count} = this.state
    this.setState({
      count: ++count
    })
    this.props.callback(count)
  }
}
