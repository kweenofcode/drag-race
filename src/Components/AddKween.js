import React, { Component } from 'react'
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

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
    this.setState({
      name: ''
    })
    this.props.history.push('/admin')
  }
  render() {
    return (
      <div className="modal modal--small">
        <h2>Add Queen</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            label="Queen's Name"
            value={this.state.name}
            onChange={this.handleChange}
            className="text-input"
            required={true}
          />
          <Button
            type="submit"
          >
          Add Queen
          </Button>
        </form>
      </div>
    )
  }
}

export default Form