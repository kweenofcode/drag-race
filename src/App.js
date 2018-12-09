import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios';

import Home from './Components/Home'
import Admin from './Components/Admin'
import AddKween from './Components/AddKween'
import AddUser from './Components/AddUser'
import AddRule from './Components/AddRule'
import User from './Components/User'
import AddPoints from './Components/AddPoints'
import Kween from './Components/Kween'

class App extends Component {
  state = {
    kweens: null,
    users: null, 
    rules: null,
  }

  refresh = async(collection) => {
    try {
      let { data: { data } } = await axios.get(`/${collection}`)
      this.setState({
        [collection]: data
      })
    } catch(e) {
      console.log(e)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  delete = async(collection, id) => {
    try {
      await axios.delete(`${collection}/${id}`)
      this.refresh(collection)
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.refresh('kweens')
    this.refresh('users')
    this.refresh('rules')
  }
  render() {
    if (this.state.kweens && this.state.users && this.state.rules) {
      return (
        <Router>
          <div> 
            <Route exact path="/" render={(props) => 
              <Home 
                {...props} 
                refresh={this.refresh}
                users={this.state.users}
                kweens={this.state.kweens}
                rules={this.state.rules}  
              />}
              />
            <Route path="/admin" render={(props) => 
              <Admin 
                {...props} 
                refresh={this.refresh} 
                users={this.state.users} 
                kweens={this.state.kweens} 
                rules={this.state.rules} 
                delete={this.delete}/>} 
                handleChange={this.handleChange}/>
            <Switch>
              <Route 
                path="/users/:user_id" 
                render={(props) => 
                  <User 
                    {...props} 
                    users={this.state.users} 
                    kweens={this.state.kweens} 
                    refresh={this.props.refresh} 
                  />
                } 
              />
              <Route 
                path="/users/add" 
                render={(props) => 
                  <AddUser 
                    {...props} 
                    refresh={this.props.refresh} 
                    handleChange={this.props.handleChange} 
                  />
                } 
              />
            </Switch>
            <Switch>
              <Route 
                path="/kweens/add" 
                render={(props) => 
                  <AddKween 
                    {...props} 
                    refresh={this.props.refresh} 
                    handleChange={this.props.handleChange} 
                  />
                }
              />
              <Route 
                path="/kweens/:kween_id/rules" 
                render={(props) => 
                  <AddPoints 
                    {...props} 
                    kweens={this.state.kweens}
                    rules={this.state.rules}
                    refresh={this.props.refresh}
                  />
                } 
              />
              <Route 
                path="/kweens/:kween_id" 
                render={(props) => 
                  <Kween 
                    {...props} 
                  />
                }
              />
            </Switch>
            <Route 
              path="/rules/add" 
              render={(props) => 
                <AddRule 
                  {...props} 
                  refresh={this.props.refresh} 
                  handleChange={this.props.handleChange} 
                />
              } 
            />
          </div>
        </Router>
      )
    }
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
