import React, { Component } from 'react'
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class AddGame extends Component {
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
    const { name, password } = this.state
    await axios.post('/game', { name, password })
    this.setState({
      name: '',
      password: '',
    })
    this.props.history.push('/admin')
  }
  render() {
    return (
      <>
        <h2>Add a New User</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            label="User's Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
          >
          Add User
          </Button>
        </form>
      </>
    )
  }
}

export default AddGame