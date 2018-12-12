import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { setToken } from '../services/tokenService'


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Signup extends Component {
  state = {
    name: "",
    password: "",
    disable: true,
    game: null, 
  }
  addUserToCurrentList = async user => {
    const { users, _id } = this.state.game
    users.push(user)
    try {
      await axios.put(`game/${_id}/player`, { users })
    } catch(e) {
      console.log(e)
    }
  }
  handleChange = async(e) => {
    if (e.target.name === 'name' && e.target.value !== '') {
      const name = e.target.value     
      const {data: {data}} = await axios.post('/signup/unique', { name })
      if (data[0] !== null) {
        this.setState({
          name,
          disable: true,
        })
      } else {
        this.setState({
          name,
          disable: false
        })  
      }
      return
    } 
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, password, game } = this.state
    const { data: { data } } = await axios.post('/signup', { name, password, game })
    console.log(data)
    const token = data[0]
    const res = await axios.get('/users/current', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const { user } = res.data.data[0]
    await this.addUserToCurrentList(user)
    setToken(token)
    this.props.getCurrentUser()
  }
  componentDidMount() {
    this.props.getCurrentUser()
    const { game } = this.props
    this.setState({
      game,
    })
  }
  render() {
    if (moment().isAfter(moment('2018-12-15'))) {
      return (
        <div>
          <h1>Sorry henny, the game race has already begun</h1>
          <Link to="/login">Already a user?</Link>
        </div>
      )
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            label="User's Name"
            value={this.state.name}
            onChange={this.handleChange}
            required={true}
          />
          <TextField
            type="password"
            name="password"
            label="User's Password"
            value={this.state.password}
            onChange={this.handleChange}
            required={true}
          />
          <Button
            type="submit"
            disabled={this.state.disable}
          >
            Add User
          </Button>
        </form>
        <Link to="/login">Already a user?</Link>
      </div>
    )
  }
}

export default Signup