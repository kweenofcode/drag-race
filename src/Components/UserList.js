import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class UserList extends Component {
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
          </ListItem>
        ))}
      </div>
    )
  }
}

export default UserList