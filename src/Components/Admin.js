import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Admin extends Component {
  state = {
    loggedIn: false,   
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <ul>
            {this.props.kweens.map((kween) => <li key={kween._id} id={kween._id}>{kween.name}</li>)}
          </ul>
          <ul>
            {this.props.users.map((user) => <li key={user._id} id={user._id}>{user.name} - {user._id} <button onClick={() => this.props.delete('users', user._id)}>Remove</button></li>)}
          </ul>
          <ul>
            {this.props.rules.map((rule) => <li key={rule._id} id={rule._id}>{rule.body} - {rule.description} {rule.points}<button onClick={() => this.props.delete('rules', rule._id)}>Remove</button></li>)}
          </ul>
          <Link to="/add/queen">Add Queen </Link>
          <Link to="/add/user">Add User </Link>
          <Link to="/add/rule">Add Rule</Link>
        </div>
      )
    }
    return (
      <div>Logged In</div>
    )
  }
}

export default Admin