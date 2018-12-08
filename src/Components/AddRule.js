import React, { Component } from 'react'
import axios from 'axios'

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
      this.props.refresh('rules')
      this.setState({
        body: '',
        description: '',
        points: 0,
      })
    } catch(e) {
      console.log(e)
    }
  }
  render() {
    return (
      <div>
        <h2>Add A New Rule</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="body">Title</label>
          <input type="text" name='body' onChange={this.handleChange} value={this.state.body} />
          <label htmlFor="description">Description</label>
          <input type="text" name='description' onChange={this.handleChange} value={this.state.description} />
          <label htmlFor="points">Points</label>
          <input type="number" name='points' onChange={this.handleChange} value={this.state.points} />
          <input type="submit" value="Add New Rule"/>
        </form>
      </div>
    )
  }
}

export default AddRule