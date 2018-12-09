import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class User extends Component {
  state = {
    user: null,
    kweens: [],
    noSubmit: true,
  }

  handleSubmit = async(e) => {
    e.preventDefault()
    const {_id} = this.state.user
    const {kweens} = this.state
    await axios.put(`/users/${_id}`, { kweens })
    this.getUser()
  }

  getRandomKweens = async(id) => {
    const kweens = []
    const allKweens = this.props.kweens
    for (let i = 0; i <= 4; i = i + 1) {
      const randomIndex = Math.floor(Math.random() * allKweens.length)
      kweens.push(allKweens[randomIndex]._id)
      allKweens.splice(randomIndex, 1)
    }
    await axios.put(`/users/${id}`, { kweens })
  }

  disableCheckboxes = (length) => {
    const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')]
    if (length >= 3) {
      checkboxes.map(checkbox => checkbox.checked ? '' : checkbox.disabled = true)
      this.setState({
        noSubmit: false,
      })
    } else {
      checkboxes.map(checkbox => checkbox.disabled = false)
      this.setState({
        noSubmit: true,
      })
    }
  }

  handleChange = (e) => {
    const kweens = this.state.kweens
    if (e.target.checked) {
      kweens.push(e.target.value)
    } else {
      const index = kweens.indexOf(e.target.value)
      kweens.splice(index, 1)
    }
    this.disableCheckboxes(kweens.length) 
    this.setState({
      kweens
    })
  }

  setUser = async() => {
    const { user_id } = this.props.match.params
    const user = this.props.users.filter(user => user._id === user_id)
    if (!user[0].kweens.length) {
      await this.getRandomKweens(user_id)
    }
    this.getUser()
  }

  getUser = async() => {
    const { user_id } = this.props.match.params
    const {data : {data} } = await axios.get(`/users/${user_id}`)
    this.setState({
      user: data
    })
  }

  componentDidMount() {
    this.setUser()
  }
  render() {
    if (this.state.user && this.state.user.kweens.length > 3) {
      return (
        <div>
          <h2>Please select your three queens</h2>
          <form onSubmit={this.handleSubmit}>
          <FormGroup>
          {this.state.user.kweens.map(kween => 
            <FormControlLabel 
              control={
                <Checkbox
                  value={kween._id}
                  onChange={this.handleChange}
                />
              }
              label={kween.name}
              key={kween._id}
            />)}
          </FormGroup>
          <Button
            type="submit"
            id="submit-btn"
            disabled={this.state.noSubmit}
          >
            Add User
          </Button>
          </form>
        </div>
      )
    }
    if (this.state.user) {
      return (
        <div>
          <h1>Hello {this.state.user.name}</h1>
          <List>
          {this.state.user.kweens.map(kween => <ListItem 
              key={kween._id} 
              id={kween._id}>
              <Link 
                to={`/kweens/${kween._id}`}>
                <ListItemText 
                  primary={kween.name}  
                />
              </Link>
            </ListItem>
          )}
          </List>
        </div>
      )
    }
    return (
      <p>....loading</p>
    )
  }
}

export default User