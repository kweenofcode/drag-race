import React, { Component } from 'react'
import axios from 'axios';

class Form extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async(e) => {
    e.preventDefault()
    const { name  } = this.state
    console.log(name)
    await axios.post('/kweens', { name })
    this.props.refresh()
    this.setState({
      name: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" type="text" onChange={this.handleChange} value={this.state.name}/>
        <input type="submit"/>
      </form>
    )
  }
}

export default Form