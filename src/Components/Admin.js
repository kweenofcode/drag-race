import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Admin extends Component {
  state = {
    loggedIn: false,   
  }
  componentDidMount() {
    this.props.refresh('users')
    this.props.refresh('kweens')
    this.props.refresh('rules')
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="modal">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <div className="half"> 
            <div>
              <h2>Queens</h2>
              <List>
                {this.props.kweens.map((kween) => <ListItem key={kween._id} id={kween._id}><ListItemText primary={kween.name} /><Button onClick={() => this.props.delete('kweens', kween._id)}>Remove</Button></ListItem>)}
              </List>
            </div>
            <div>
              <h2>Users</h2>
              <List>
                {this.props.users.map((user) => <ListItem key={user._id} id={user._id}><ListItemText primary={user.name} secondary={user._id} /><Button   onClick={() => this.props.delete('users', user._id)}>Remove</Button></ListItem>)}
              </List>
            </div>
          </div>
          <div className="full">          
            <h2>Rules</h2>
            <List>
              {this.props.rules.map((rule) => <ListItem key={rule._id} id={rule._id}><ListItemText primary={`${rule.body}  ${rule.points}`} secondary={rule.description} />{rule.points}<Button onClick={() => this.props.delete('rules', rule._id)}>Remove</Button></ListItem>)}
            </List>
          </div>
          <div className="navigation">
            <Link to="/add/queen">
              <Button>Add Queen</Button>
            </Link>
            <Link to="/add/user">
              <Button>Add User</Button>
            </Link>
            <Link to="/add/rule">
              <Button>Add Rule</Button>
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div>Logged In</div>
    )
  }
}

export default Admin