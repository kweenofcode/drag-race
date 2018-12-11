import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class User extends Component {
  state = {
    user: null,
    kweens: [],
    noSubmit: true,
  }

  render() {
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
}

export default User