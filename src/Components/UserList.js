import React, { Component } from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'

class UserList extends Component {
  deleteUser = async (collection, id) => {
    await this.props.delete(collection, id)
    this.props.getGames()
  }
  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <ListItem
            id={user._id}
            key={user._id}
          >
            <ListItemText
              primary={user.name}
              secondary={user._id}
            />
            <Button 
              onClick={() => this.deleteUser('users', user._id)}
            > 
              Remove
            </Button>
          </ListItem>
        ))}
      </div>
    )
  }
}

export default UserList