import React, { Component } from 'react'
import { Header } from 'components'


const Fragment = React.Fragment
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      b: 1,
      list: [
        'a',
        'b',
        'c',
        'd',
        'e'
      ]
    }
  }
  componentWillMount () {
  }
  showBox () {
    const {active} = this.state
    switch (active) {
      case 1:
        return (
          <p>111</p>
        )
        break;
    
      default:
        break;
    }
  }
  render () {
    const a = 111
    return (
      <Fragment>
        <div>
        this is index !!!
        </div>
        <div>this is index</div>
        {
          a ? <Header a={this.state.b} callback={this.callback.bind(this)} /> : null
        }
        {
          this.state.list.map((value, index) => (
            <p key={index}>{value}</p>
          ))
        }
        {
          this.showBox()
        }
      </Fragment>
    )
  }
  callback (b) {
    this.setState({
      b
    })
  }
}
