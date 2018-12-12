import React, { Component } from 'react'
import axios from 'axios'

import TextField from '@material-ui/core/TextField'

class AddRule extends Component {
  state = {
    body: '',
    description: '',
    points: 0,
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { body, description, points } = this.state
      await axios.post('/rules', { body, description, points })
      this.setState({
        body: '',
        description: '',
        points: 0,
      })
      this.props.history.push('/admin')
    } catch(e) {
      console.log(e)
    }
  }
  render() {
    return (
      <div>
        <h2>Add A New Rule</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            label="Title"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <TextField
            name="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <TextField
            name="points"
            type="number"
            label="Points"
            value={this.state.points}
            onChange={this.handleChange}
          />
          <TextField 
            type="submit"  
            value="Add Rule"
          />
        </form>
      </div>
    )
  }
}

export default AddRule