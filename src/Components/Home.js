import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Home extends Component {
  render(){
    return (
      <div>
        <Link to="/admin">Admin</Link>
        <h1>Home</h1>
        <List>
          {this.props.users.map((user) => <ListItem key={user._id} id={user._id}><Link to={`users/${user._id}`}><ListItemText primary={user.name} secondary={user._id} /></Link></ListItem>)}
        </List>
      </div>
    )
  }
}

export default Home