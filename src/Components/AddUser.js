import React, { Component } from 'react'
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

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
    this.setState({
      name: ''
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

export default AddUser