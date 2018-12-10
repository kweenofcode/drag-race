import React, { Component } from 'react'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Login extends Component {
  state = {
    name: "",
    password: "",
    user: null,
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, password } = this.state
    const {data : { data }} = await axios.post('/login', { name, password })
    const user = data[0]
    this.setState({
      name: '',
      password: '',
      user,
    })
  }
  render() {
    return (
      <div>
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
            label="User's Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
          >
            Add User
          </Button>
        </form>
      </div>
    )
  }
}

export default Login