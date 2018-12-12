import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';

import UserList from '../Components/UserList'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Admin extends Component {
  state = {
    games: null,  
  }
  handleElimination = async(e, id) => {
    let eliminated;
    if (e.target.checked) {
      eliminated = true;
      await axios.put(`/kweens/${id}/eliminated`, { eliminated })
    } else {
      eliminated = false
      await axios.put(`/kweens/${id}/eliminated`, { eliminated })
    }
    this.props.refresh('kweens')
  }

  getGames = async() => {
    const { data: {data} } = await axios.get('/game')
    const games = data[0]
    this.setState({
      games
    })
  }
  deleteGame = async (collection, id) => {
    await this.props.delete(collection, id)
    this.getGames()
  }
  componentDidMount() {
    this.getGames()
  }
  render() {
    if (!this.props.user.admin) {
      return (
        <h1>Sorry, Henny. You aren't authorized to see this page.</h1>
      )
    }
    if (this.state.games) {
      return (
        <div className="modal">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <div className="half"> 
            <div>
              <h2>Queens</h2>
              <List>
                {this.props.kweens.map((kween, i) => 
                  <ListItem 
                    key={kween._id}  
                    id={kween._id}>
                    <Link to={`/kweens/${kween._id}/rules`}>
                      <ListItemText 
                        primary={kween.name} 
                      />
                    </Link>
                    <FormControlLabel
                      control={
                        <Switch
                          value={kween._id}
                          onChange={(e) => this.handleElimination(e, kween._id)}
                          checked={kween.eliminated}
                        />
                      }
                      label="Eliminated"
                      key={kween._id}
                    />
                    <Button 
                      onClick={() => this.props.delete('kweens', kween._id)  }>
                      Remove
                    </Button>
                  </ListItem>)}
              </List>
            </div>
            <div>
              <h2>Games</h2>
              <List>
                {this.state.games.map((game) =>
                  <div>
                    <h3>{game.name}</h3>
                    <Button 
                      onClick={() => this.deleteGame('game', game._id)
                    }>
                      Remove
                    </Button>
                    <h4>Players</h4>
                  <UserList 
                    users={game.users} 
                    delete={this.props.delete}
                    getGames={this.getGames}
                  />
                  </div>)}
              </List>
            </div>
          </div>
          <div className="full">          
            <h2>Rules</h2>
            <List>
              {this.props.rules.map((rule) => 
                <ListItem 
                  key={rule._id} 
                  id={rule._id}>
                  <ListItemText 
                    primary={`${rule.body}  ${rule.points}`} 
                    secondary={rule.description} 
                  />
                  <Button 
                    onClick={() => this.props.delete('rules', rule._id)}>
                    Remove
                  </Button>
                </ListItem>)}
            </List>
          </div>
          <div className="navigation">
            <Link to="/kweens/add">
              <Button>Add Queen</Button>
            </Link>
            <Link to="/game/add">
              <Button>Add Game</Button>
            </Link>
            <Link to="/rules/add">
              <Button>Add Rule</Button>
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div>Loading</div>
    )
  }
}

export default Admin