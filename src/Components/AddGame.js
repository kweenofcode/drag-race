import React, { Component } from 'react'
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import Unauthorized from '../Components/Unauthorized'

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
    if (this.props.user.admin) {
      return (
        <div className="modal modal--small">
          <h2>Add a New Game</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="name"
              label="Name of the Game is:"
              value={this.state.name}
              onChange={this.handleChange}
              className="text-input"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
              className="text-input"
            />
            <Button
              type="submit"
            >
            Add Game
            </Button>
          </form>
        </div>
      )
    }
    return (
      <Unauthorized />
    )
  }
}

export default AddGame