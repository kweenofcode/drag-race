import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect 
} from 'react-router-dom'
import axios from 'axios';

import {getToken} from './services/tokenService'

import Home from './Components/Home'
import Admin from './Components/Admin'
import AddKween from './Components/AddKween'
import AddGame from './Components/AddGame'
import AddRule from './Components/AddRule'
import User from './Components/User'
import AddPoints from './Components/AddPoints'
import Kween from './Components/Kween'
import Login from './Components/Login'
import Join from './Components/Join'
import Signup from './Components/Signup'

class App extends Component {
  state = {
    game: null,
    kweens: null,
    rules: null,
    user: null,
    loading: true,
  }

  getGames = async () => {
    const { data: { data } } = await axios.get('/game')
    const games = data[0]
    this.setState({
      games
    })
  }
  getCurrentUser = async() => {
    const token = getToken()
    if (token) {
      try {
        const res = await axios.get('/users/current', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        const { user , game } = res.data.data[0]
        this.setState({
          user, 
          game,
        })
        return
      } catch(e) {
        console.log(e)
      }
    }
    this.setState({
      loading: false,
    })
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
  setGame = game => {
    this.setState({
      game,
    })
  }
  setUser = user => {
    this.setState({
      user
    })
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
    this.refresh('rules')
  }
  render() {
      return (
        <Router>
          <div> 
            <Route exact path="/" render={() => (
              this.state.user ? 
              <Home
                refresh={this.refresh}
                users={this.state.game.users}
                kweens={this.state.kweens}
                rules={this.state.rules}
                user={this.state.user}
                getCurrentUser={this.getCurrentUser}
                setUser={this.setUser}
                setGame={this.setGame}
              /> 
              :
              <Redirect to="/join" />
              )}
              />
            <Route path="/admin" render={(props) => (
              this.state.user ?
              <Admin 
                {...props} 
                getGames={this.getGames}
                refresh={this.refresh} 
                kweens={this.state.kweens} 
                rules={this.state.rules} 
                delete={this.delete} 
                user={this.state.user}
                handleChange={this.handleChange}
              /> 
              : 
              <Redirect to="/" />
            )}
            />
            <Switch>
              <Route 
                path="/users/:user_id" 
                render={(props) => (
                  this.state.user 
                  ?
                  <User 
                    {...props} 
                    users={this.state.users} 
                    kweens={this.state.kweens} 
                    refresh={this.props.refresh} 
                  />
                  :
                  <Redirect to="/join" />
                )} 
              />
              <Route 
                path="/game/add" 
                render={(props) => (
                  this.state.user && this.state.user.admin 
                  ? 
                  <AddGame
                    {...props} 
                    refresh={this.props.refresh} 
                    handleChange={this.props.handleChange} 
                  />
                  :
                  <Redirect to="/" />
                )} 
              />
            </Switch>
            <Switch>
              <Route 
                path="/kweens/add" 
                render={(props) => (
                  this.state.user && this.state.user.admin 
                  ?
                  <AddKween 
                    {...props} 
                    refresh={this.props.refresh} 
                    handleChange={this.props.handleChange} 
                  />
                  :
                  <Redirect to="/" />
                )}
              />
              <Route 
                path="/kweens/:kween_id/rules" 
                render={(props) => (
                  this.state.user && this.state.user.admin 
                  ?
                  <AddPoints 
                    {...props} 
                    kweens={this.state.kweens}
                    rules={this.state.rules}
                    refresh={this.props.refresh}
                  />
                  :
                  <Redirect to="/" />
                )} 
              />
              <Route 
                path="/kweens/:kween_id" 
                render={(props) => 
                  <Kween 
                    {...props} 
                    kweens={this.state.kweens}
                  />
                }
              />
            </Switch>
            <Route 
              path="/rules/add" 
              render={(props) => (
                this.state.user && this.state.user.admin 
                ?
                <AddRule 
                  {...props} 
                  refresh={this.props.refresh} 
                  handleChange={this.props.handleChange} 
                />
                :
                <Redirect to="/" />
              )} 
            />
            <Route 
              path="/login"
              render={(props) => (
                !this.state.user && this.state.game
                ?
                <Login 
                  {...props}
                  setUser={this.setUser}
                  game={this.state.game}
                  getCurrentUser={this.getCurrentUser}
                />
                :
                <Redirect to="/" />
              )}
            />
            <Route 
              path="/join"
              render={(props) => (
                !this.state.game 
                ?
                <Join {...props} 
                  setGame={this.setGame}
                  getCurrentUser={this.getCurrentUser}
                  loading={this.state.loading}
                />
                : 
                <Redirect to="/signup" />
              )}/>
              <Route 
                path="/signup"
                render={(props) => (
                  !this.state.user && this.state.game
                  ?
                  <Signup 
                    setUser={this.setUser}
                    game={this.state.game}
                    getCurrentUser={this.getCurrentUser}
                  />
                  :
                  <Redirect to="/" />
                )}
                />
          </div>
        </Router>
      )
    }
  }


export default App;
