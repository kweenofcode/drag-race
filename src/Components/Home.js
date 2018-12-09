import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        kween.points.forEach((rule) => {
          user.score += Number(rule.points)
        })
      })
      return user  
    })
    this.setState({
      users
    })
  }
  componentDidMount() {
    this.addUpTheTens()
  }
  render(){
    return (
      <div>
        <Link to="/admin">Admin</Link>
        <h1>Home</h1>
        <List>
          {this.props.kweens.map((kween) =>
            <ListItem
              key={kween._id}
              id={kween._id}>
              <Link
                to={`kweens/${kween._id}`}>
                <ListItemText
                  primary={kween.name}
                />
              </Link>
            </ListItem>)}
        </List>
        <List>
          {this.props.users
            .filter(user => user.kweens.length === 3)
            .map((user) => 
            <ListItem 
              key={user._id} 
              id={user._id}>
              <Link 
                to={`users/${user._id}`}>
                <ListItemText 
                  primary={user.name} 
                  secondary={user._id} 
                />
                <ListItemText 
                  primary={user.score}
                />
              </Link>
            </ListItem>)}
        </List>
      </div>
    )
  }
}

export default Home