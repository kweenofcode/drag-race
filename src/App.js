import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import axios from 'axios';

import AddKween from './Components/AddKween'

class App extends Component {
  state = {
    kweens: null,
  }

  refresh = async() => {
    try {
      let { data: { data } } = await axios.get('/kweens')
      // const randomKweens = []
      // for (let i = 0; i <= 4; i = i + 1) {
      //   const randomIndex = Math.floor(Math.random() * data.length)
      //   randomKweens.push(data[randomIndex])
      //   console.log(randomKweens)
      //   data.splice(randomIndex, 1)
      // }
      this.setState({
        kweens: data
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

  componentDidMount() {
    this.refresh()
  }
  render() {
    if (this.state.kweens) {
      return (
        <Router>
          <div> 
            <ul>
              {this.state.kweens.map((kween) => <li key={kween._id} id={kween._id}>{kween.name}</li>)}
            </ul>
            <Link to="/add">Add A Queen</Link>
            <Route path="/add" render={(props) => <AddKween {...props} refresh={this.refresh}/>} />
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
