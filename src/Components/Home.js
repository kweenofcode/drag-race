import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import ItemList from '../Components/ItemList'

import List from '@material-ui/core/List';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import { ListItem } from '@material-ui/core';

class Home extends Component {
  state = {
    noSubmit: true,
    user: null,
    kweens: [], 
  }
  addUpTheTens = () => {
    const users = this.props.users
    users.map((user) => {
      user.score = 0
      user.kweens.forEach((kween) => {
        kween.score = 0
        kween.points.forEach((rule) => {
          kween.score += Number(rule.points)
        })
        user.score += Number(kween.score)
      })
      return user  
    })
    this.setState({
      users
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { _id } = this.props.user
    const { kweens } = this.state
    await axios.put(`/users/${_id}/kweens`, { kweens })
    await this.props.getCurrentUser()
    this.addUpTheTens()
  }

  getRandomKweens = async (id) => {
    if (this.props.user.kweens.length === 0) {
      const kweens = []
      const allKweens = this.props.kweens
      for (let i = 0; i <= 4; i = i + 1) {
        const randomIndex = Math.floor(Math.random() * allKweens.length)
        kweens.push(allKweens[randomIndex]._id)
        allKweens.splice(randomIndex, 1)
      }
      await axios.put(`/users/${id}/kweens`, { kweens })
      this.props.getCurrentUser()
    }
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

  async componentDidMount() {
    await this.props.getCurrentUser()
    await this.getRandomKweens(this.props.user._id)
    this.addUpTheTens()
  }
  render(){
    if (this.props.user && this.props.user.kweens.length > 3) {
      return (
        <div className="modal modal--small">
          <h2>Pick Your Queens</h2>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              {this.props.user.kweens.map(kween =>
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
              className="btn"
            >
              Pick Queens
          </Button>
          </form>
        </div>
      )
    }
    return (
      <div className="modal">
        <Link className="btn admin-btn" to="/admin">Admin</Link>
        <h1>Leader Board</h1>
        <List className="tile"> 
          {this.props.users
            .filter(user => user.kweens.length === 3)
            .sort((a, b) => a.score > b.score)
            .map((user, i) => ( 
              <ListItem className="column">
                <p>{i + 1}</p>
                <h2 key={user._id} id={user._id}> {user.name} </h2>
                <ItemList kweens={user.kweens}/>
                <h3>Score: {user.score}</h3>
              </ListItem>
            ))}
        </List>
      </div>
    )
  }
}

export default Home