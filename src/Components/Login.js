import React, { Component } from 'react'
import axios from 'axios'

import {setToken} from "../services/tokenService"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Login extends Component {
  state = {
    name: "",
    password: "",
    user: null,
    game: null,
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
    const { game } = this.props
    this.setState({
      game,
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, password, game } = this.state
    const res = await axios.post('/login', { name, password, game })
    const token = res.data.data[0]
    setToken(token)
    this.setState({
      name: '',
      password: '',
    })
    this.props.getCurrentUser()
  }
  render() {
    return (
      <div className="modal modal--small">
        <h1>Already playing? Sign-in below.</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            label="User's Name"
            value={this.state.name}
            onChange={this.handleChange}
            className="text-input"
            required={true}
          />
          <TextField
            type="password"
            name="password"
            label="User's Password"
            value={this.state.password}
            onChange={this.handleChange}
            className="text-input"
            required={true}
          />
          <Button
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    )
  }
}

export default Login