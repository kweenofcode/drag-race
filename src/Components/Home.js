import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ItemList from '../Components/ItemList'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Home extends Component {
  state = {
    users: null,
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
  componentDidMount() {
    this.addUpTheTens()
    this.props.refresh('kweens')
    this.props.refresh('users')
  }
  render(){
    return (
      <div>
        <Link to="/admin">Admin</Link>
        <h1>Home</h1>
        <List>
          {this.props.users
            .filter(user => user.kweens.length === 3)
            .map((user) => ( 
              <div>
                <h1 key={user._id} id={user._id}> {user.name} </h1>
                <ItemList kweens={user.kweens}/>
                <h3>Score: {user.score}</h3>
              </div>
            ))}
        </List>
      </div>
    )
  }
}

export default Home