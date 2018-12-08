import React, { Component } from 'react'
import axios from 'axios';

class AddUser extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { name } = this.state
    console.log(name)
    await axios.post('/users', { name })
    this.props.refresh('users')
    this.setState({
      name: ''
    })
  }
  render() {
    return (
      <>
        <h2>Add a New User</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" onChange={this.handleChange} value={this.state.name} />
          <input type="submit" />
        </form>
      </>
    )
  }
}

export default AddUser