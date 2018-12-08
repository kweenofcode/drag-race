import React, {Component} from 'react'
import axios from 'axios';

class User extends Component {
  state = {
    user: null,
  }
  getUser = async() => {
    const {user_id} = this.props.match.params
    const {data: {data}} = await axios.get(`/users/${user_id}`)
    this.setState({
      user: data
    })
  }


  componentDidMount() {
    this.getUser()
  }
  render() {
    if (this.state.user) {
      return (
        <div>
          <h1>Hello {this.state.user.name}</h1>
        </div>
      )
    }
    return (
      <p>....loading</p>
    )
  }
}

export default User