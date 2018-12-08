import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios';

import Admin from './Components/Admin'
import AddKween from './Components/AddKween'
import AddUser from './Components/AddUser'
import AddRule from './Components/AddRule'

class App extends Component {
  state = {
    kweens: null,
    users: null, 
  }

  refresh = async(collection) => {
    try {
      let { data: { data } } = await axios.get(`/${collection}`)
      // const randomKweens = []
      // for (let i = 0; i <= 4; i = i + 1) {
      //   const randomIndex = Math.floor(Math.random() * data.length)
      //   randomKweens.push(data[randomIndex])
      //   console.log(randomKweens)
      //   data.splice(randomIndex, 1)
      // }
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
            <Link to="/admin">Admin</Link>
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
              <Route path="/add/queen" render={(props) => <AddKween {...props} refresh={this.props.refresh} handleChange={this.props.handleChange} />} />
              <Route path="/add/user" render={(props) => <AddUser {...props} refresh={this.props.refresh} handleChange={this.props.handleChange} />} />
              <Route path="/add/rule" render={(props) => <AddRule {...props} refresh={this.props.refresh} handleChange={this.props.handleChange} />} />
            </Switch>
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
