import React, {Component} from 'react'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Join extends Component {
  state ={
    game: null,
    name: "",
    password: "",
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, password } = this.state
    const { data: { data } } = await axios.post('/game/join', { name, password })
    const game = data[0]
    this.setState({
      name: '',
      password: '',
    })
    this.props.setGame(game)
  }
  componentDidMount() {
    this.props.getCurrentUser()
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="name"
          label="Name of the Game"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Button
          type="submit"
        >
          Join Game
          </Button>
      </form>
    )
  }
}

export default Join